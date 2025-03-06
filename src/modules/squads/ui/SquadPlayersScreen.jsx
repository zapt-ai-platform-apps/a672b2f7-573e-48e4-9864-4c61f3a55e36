import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import * as Sentry from '@sentry/browser';
import { supabase } from '@/supabaseClient';
import { Button } from '@/modules/ui/components/Button';

function SquadPlayersScreen() {
  const { squadId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [squadName, setSquadName] = useState('');
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!squadId) return;
    
    fetchSquadPlayers();
  }, [squadId]);

  const fetchSquadPlayers = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching squad players for squadId:', squadId);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`/api/squads-players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'getPlayers',
          squadId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch squad players');
      }

      const players = await response.json();
      console.log('Fetched players:', players);
      setPlayers(players);
      
      // Fetch squad details to get the name
      const squadResponse = await fetch(`/api/squads`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      
      if (squadResponse.ok) {
        const squads = await squadResponse.json();
        const squad = squads.find(s => s.id === squadId);
        if (squad) {
          setSquadName(squad.name);
        }
      }
    } catch (error) {
      console.error('Error fetching squad players:', error);
      Sentry.captureException(error);
      toast.error('Failed to load players');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    
    if (!newPlayerName.trim()) {
      toast.error('Please enter a player name');
      return;
    }

    setIsAdding(true);
    try {
      console.log('Adding player:', newPlayerName, 'to squad:', squadId);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'addPlayer',
          squadId,
          name: newPlayerName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add player');
      }

      const newPlayer = await response.json();
      console.log('Player added successfully:', newPlayer);
      
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      toast.success('Player added successfully!');
    } catch (error) {
      console.error('Error adding player:', error);
      Sentry.captureException(error);
      toast.error('Failed to add player');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemovePlayer = async (playerId) => {
    if (!confirm('Are you sure you want to remove this player?')) return;
    
    try {
      console.log('Removing player:', playerId, 'from squad:', squadId);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'removePlayer',
          squadId,
          playerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove player');
      }

      setPlayers(players.filter(player => player.id !== playerId));
      toast.success('Player removed successfully!');
    } catch (error) {
      console.error('Error removing player:', error);
      Sentry.captureException(error);
      toast.error('Failed to remove player');
    }
  };

  const handleUseSquadForMatch = () => {
    if (players.length === 0) {
      toast.error('Please add players to your squad first');
      return;
    }

    // Format players for game setup - no need for selection screen
    const formattedPlayers = players.map(player => ({
      name: player.name,
      isStartingPlayer: false // Default all to false, will be set in setup screen
    }));

    // Save selected players to localStorage for the game setup
    localStorage.setItem('players', JSON.stringify(formattedPlayers));
    
    // Store the squad ID in localStorage for later use
    localStorage.setItem('current_squad_id', squadId);
    
    // Navigate directly to setup screen, bypassing the selection screen
    navigate('/setup', { 
      state: {
        fromSquad: true
      }
    });
    
    toast.success('Squad loaded for match!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 md:p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-500 mb-4 md:mb-0">{squadName || 'Squad'} Players</h1>
          <Button
            onClick={() => navigate('/squads')}
            variant="secondary"
            size="small"
          >
            Back to Squads
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-brand-500">Add New Player</h2>
          <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-brand-400 box-border text-base"
              placeholder="Player Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              disabled={isAdding}
            />
            <Button
              type="submit"
              disabled={isAdding}
              className="sm:rounded-l-none cursor-pointer"
              size="small"
            >
              {isAdding ? 'Adding...' : 'Add Player'}
            </Button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-brand-500">Squad Players</h2>
          {players.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No players added yet. Add your first player above.</p>
          ) : (
            <ul className="space-y-3 md:space-y-4">
              {players.map((player) => (
                <li key={player.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="text-base md:text-lg mb-2 sm:mb-0">{player.name}</span>
                  <Button
                    onClick={() => handleRemovePlayer(player.id)}
                    variant="danger"
                    size="small"
                    className="self-start sm:self-auto"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {players.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-brand-500">Use Squad for Match</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Set up your starting lineup and goalie for your match.
            </p>
            <Button 
              onClick={handleUseSquadForMatch}
              variant="success"
              size="large"
              fullWidth
            >
              Set Up Match with This Squad
            </Button>
          </div>
        )}
      </div>
      
      {/* "Made on ZAPT" badge */}
      <div className="fixed bottom-4 left-4">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs md:text-sm text-gray-500 hover:text-brand-500 transition-colors"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}

export default SquadPlayersScreen;