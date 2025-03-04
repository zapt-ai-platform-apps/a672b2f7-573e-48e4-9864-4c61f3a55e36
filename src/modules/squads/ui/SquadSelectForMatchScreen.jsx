import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';
import { Button } from '@/modules/ui/components/Button';

function SquadSelectForMatchScreen() {
  const { squadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { players: squadPlayers = [], squadName = 'Squad' } = location.state || {};

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);

  useEffect(() => {
    // Initialize players with selection state - remove starting player flag
    const initializedPlayers = squadPlayers.map(player => ({
      ...player,
      isSelected: false
    }));
    setSelectedPlayers(initializedPlayers);
  }, [squadPlayers]);

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers(prev => 
      prev.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            isSelected: !player.isSelected
          };
        }
        return player;
      })
    );
  };

  const handleGoalkeeperChange = (e) => {
    setGoalkeeper(e.target.value);
  };

  const handleProceedToMatch = () => {
    try {
      // Get only selected players
      const matchPlayers = selectedPlayers.filter(player => player.isSelected);
      
      if (matchPlayers.length === 0) {
        toast.error('Please select at least one player for the match');
        return;
      }

      if (goalkeeper && !matchPlayers.some(p => p.name === goalkeeper)) {
        toast.error('Selected goalkeeper must be in the match squad');
        return;
      }

      // Format players for game setup - no longer setting starting lineup here
      const formattedPlayers = matchPlayers.map(player => ({
        name: player.name,
        isStartingPlayer: false // Default all to false, will be set in setup screen
      }));

      // Save selected players to localStorage for the game setup
      localStorage.setItem('players', JSON.stringify(formattedPlayers));
      
      // Store the squad ID in localStorage for later use
      localStorage.setItem('current_squad_id', squadId);
      
      // Navigate to game setup with selected goalkeeper and GK playtime preference
      navigate('/setup', { 
        state: {
          preSelectedGoalkeeper: goalkeeper,
          includeGKPlaytime: includeGKPlaytime,
          fromSquad: true
        }
      });
      
      toast.success('Squad loaded for match!');
    } catch (error) {
      console.error('Error preparing match setup:', error);
      Sentry.captureException(error);
      toast.error('Failed to set up match');
    }
  };

  const goBack = () => {
    navigate(`/squads/${squadId}/players`);
  };

  // Get count of selected players
  const selectedCount = selectedPlayers.filter(p => p.isSelected).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-500">Select Players from {squadName}</h1>
          <Button onClick={goBack} variant="secondary">Back</Button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-brand-500">Match Squad Selection</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Select which players will be available for this match. You'll choose your starting lineup in the next step.
          </p>
          <p className="mb-6 text-sm text-brand-500">
            Selected: {selectedCount} players
          </p>

          <div className="space-y-4">
            {selectedPlayers.map(player => (
              <div key={player.id} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex items-center flex-1">
                  <input
                    type="checkbox"
                    checked={player.isSelected}
                    onChange={() => togglePlayerSelection(player.id)}
                    className="mr-4 h-5 w-5 cursor-pointer"
                  />
                  <span className="text-lg">{player.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-brand-500">Goalkeeper Settings</h2>
          
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select Goalkeeper:</label>
            <select
              value={goalkeeper}
              onChange={handleGoalkeeperChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 box-border"
            >
              <option value="">None Selected</option>
              {selectedPlayers
                .filter(player => player.isSelected)
                .map(player => (
                  <option key={player.id} value={player.name}>
                    {player.name}
                  </option>
                ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeGKPlaytime"
              checked={includeGKPlaytime}
              onChange={() => setIncludeGKPlaytime(!includeGKPlaytime)}
              className="h-5 w-5 cursor-pointer"
            />
            <label htmlFor="includeGKPlaytime" className="ml-3 cursor-pointer">
              Include goalkeeper's time in playtime totals
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleProceedToMatch}
            variant="success"
            size="large"
            disabled={selectedCount === 0}
          >
            Proceed to Match Setup
          </Button>
        </div>
      </div>
      
      {/* "Made on ZAPT" badge */}
      <div className="fixed bottom-4 left-4">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-brand-500 transition-colors"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}

export default SquadSelectForMatchScreen;