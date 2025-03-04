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

    // Navigate to squad selection for match
    navigate(`/squads/${squadId}/select-for-match`, { 
      state: { players, squadName } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brand-500">{squadName || 'Squad'} Players</h1>
          <Button
            onClick={() => navigate('/squads')}
            variant="secondary"
          >
            Back to Squads
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-brand-500">Add New Player</h2>
          <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="sm:flex-1 p-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:rounded-l-md rounded-t-md sm:rounded-tr-none sm:rounded-bl-md focus:outline-none focus:ring-2 focus:ring-brand-400 box-border text-lg"
              placeholder="Player Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              disabled={isAdding}
            />
            <Button
              type="submit"
              disabled={isAdding}
              className="sm:px-8 px-4 py-4 sm:rounded-r-md rounded-b-md sm:rounded-bl-none cursor-pointer"
            >
              {isAdding ? 'Adding...' : 'Add Player'}
            </Button>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-brand-500">Squad Players</h2>
          {players.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No players added yet. Add your first player above.</p>
          ) : (
            <ul className="space-y-4">
              {players.map((player) => (
                <li key={player.id} className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="text-lg">{player.name}</span>
                  <Button
                    onClick={() => handleRemovePlayer(player.id)}
                    variant="danger"
                    size="small"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {players.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-brand-500">Use Squad for Match</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Select which players from this squad will play in your match and set up your starting lineup.
            </p>
            <Button 
              onClick={handleUseSquadForMatch}
              variant="success"
              size="large"
              fullWidth
            >
              Select Players for Match
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
          className="text-sm text-gray-500 hover:text-brand-500 transition-colors"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}

export default SquadPlayersScreen;