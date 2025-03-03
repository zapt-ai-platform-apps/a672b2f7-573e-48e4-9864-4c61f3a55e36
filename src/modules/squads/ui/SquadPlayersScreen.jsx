import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSquads } from '@/modules/squads/api';
import { Button } from '@/modules/ui/components/Button';
import { Card } from '@/modules/ui/components/Card';
import * as Sentry from '@sentry/browser';

function SquadPlayersScreen() {
  const { squadId } = useParams();
  const navigate = useNavigate();
  const { squads, getSquadPlayers, addPlayerToSquad, removePlayerFromSquad } = useSquads();
  
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [squadName, setSquadName] = useState('');
  const [activeWeekPlayers, setActiveWeekPlayers] = useState([]);
  
  useEffect(() => {
    const squad = squads.find(s => s.id === parseInt(squadId));
    if (squad) {
      setSquadName(squad.name);
    }
  }, [squadId, squads]);
  
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const fetchedPlayers = await getSquadPlayers(squadId);
        setPlayers(fetchedPlayers);
        
        // Try to load active players from local storage
        try {
          const savedActivePlayerIds = JSON.parse(localStorage.getItem(`squad_${squadId}_active_players`)) || [];
          setActiveWeekPlayers(savedActivePlayerIds);
        } catch (e) {
          console.error('Error loading active players from localStorage:', e);
          setActiveWeekPlayers([]);
        }
      } catch (err) {
        console.error('Error fetching squad players:', err);
        Sentry.captureException(err);
        setError('Failed to load players. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (squadId) {
      fetchPlayers();
    }
  }, [squadId, getSquadPlayers]);
  
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    
    try {
      const newPlayer = await addPlayerToSquad(squadId, playerName.trim());
      setPlayers(prev => [...prev, newPlayer]);
      setPlayerName('');
    } catch (err) {
      console.error('Error adding player:', err);
      setError('Failed to add player. Please try again.');
    }
  };
  
  const handleRemovePlayer = async (playerId) => {
    const confirmed = window.confirm('Are you sure you want to remove this player from the squad?');
    if (!confirmed) return;
    
    try {
      await removePlayerFromSquad(squadId, playerId);
      setPlayers(prev => prev.filter(player => player.id !== playerId));
      
      // Remove from active players if present
      setActiveWeekPlayers(prev => prev.filter(id => id !== playerId));
    } catch (err) {
      console.error('Error removing player:', err);
      setError('Failed to remove player. Please try again.');
    }
  };
  
  const toggleActivePlayer = (playerId) => {
    setActiveWeekPlayers(prev => {
      const isActive = prev.includes(playerId);
      const newActive = isActive 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId];
      
      // Save to localStorage
      localStorage.setItem(`squad_${squadId}_active_players`, JSON.stringify(newActive));
      return newActive;
    });
  };
  
  const handleContinueToGameSetup = () => {
    const selectedPlayers = players
      .filter(player => activeWeekPlayers.includes(player.id))
      .map(player => ({
        name: player.name,
        isStartingPlayer: false
      }));
    
    if (selectedPlayers.length === 0) {
      setError('Please select at least one player for this week.');
      return;
    }
    
    // Save selected players to localStorage for the game setup
    localStorage.setItem('players', JSON.stringify(selectedPlayers));
    navigate('/setup');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{squadName}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Select players for this week's game
            </p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" onClick={() => navigate('/squads')}>
              Back to Squads
            </Button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <Card className="mb-6">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Player</h2>
            <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter player name"
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white box-border"
              />
              <Button type="submit" disabled={!playerName.trim()}>
                Add Player
              </Button>
            </form>
          </div>
        </Card>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Squad Players ({players.length})
          </h2>
          
          {players.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-4">
              No players in this squad yet. Add your first player above.
            </p>
          ) : (
            <div className="space-y-3">
              {players.map((player) => (
                <div 
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-md border ${
                    activeWeekPlayers.includes(player.id)
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={activeWeekPlayers.includes(player.id)}
                      onChange={() => toggleActivePlayer(player.id)}
                      className="mr-3 h-5 w-5 cursor-pointer"
                    />
                    <span className={`text-lg ${activeWeekPlayers.includes(player.id) ? 'font-medium' : ''}`}>
                      {player.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    &#128465;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            variant="success" 
            size="large" 
            onClick={handleContinueToGameSetup}
            disabled={activeWeekPlayers.length === 0}
          >
            Continue to Game Setup
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SquadPlayersScreen;