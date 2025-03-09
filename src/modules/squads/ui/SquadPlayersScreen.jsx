import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import * as Sentry from '@sentry/browser';
import { supabase } from '@/supabaseClient';
import { Button } from '@/modules/ui/components/Button';
import { Card } from '@/modules/ui/components/Card';
import { useSquads } from '@/modules/squads/api';
import EditSquadNameModal from './EditSquadNameModal';
import { HiOutlineUserRemove, HiOutlineUserAdd, HiOutlinePencil, HiOutlineChevronLeft, HiOutlinePlay } from 'react-icons/hi';

function SquadPlayersScreen() {
  const { squadId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { updateSquad } = useSquads();
  const [squadName, setSquadName] = useState('');
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [squadData, setSquadData] = useState(null);

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
          setSquadData(squad);
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

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateSquad = async (id, name) => {
    try {
      const updatedSquad = await updateSquad(id, name);
      setSquadName(updatedSquad.name);
      setSquadData(updatedSquad);
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="page-container flex justify-center items-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button
              variant="outline"
              size="small"
              onClick={() => navigate('/squads')}
              className="mr-3 cursor-pointer"
            >
              <HiOutlineChevronLeft className="mr-1" /> Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-500 truncate max-w-[200px] md:max-w-xs">
              {squadName || 'Squad'}
            </h1>
            <button
              onClick={handleOpenEditModal}
              className="ml-2 p-1 text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Edit squad name"
            >
              <HiOutlinePencil className="w-5 h-5" />
            </button>
          </div>
          
          <Button
            onClick={handleUseSquadForMatch}
            variant="success"
            size="medium"
            className="cursor-pointer"
            disabled={players.length === 0}
          >
            <HiOutlinePlay className="mr-1" /> Start Match
          </Button>
        </div>

        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <HiOutlineUserAdd className="mr-2" /> Add New Player
          </h2>
          <form onSubmit={handleAddPlayer} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-brand-400 box-border"
              placeholder="Player Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              disabled={isAdding}
            />
            <Button
              type="submit"
              disabled={isAdding || !newPlayerName.trim()}
              className="sm:rounded-l-none cursor-pointer"
              size="medium"
              variant="primary"
            >
              {isAdding ? 'Adding...' : 'Add Player'}
            </Button>
          </form>
        </Card>

        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Squad Players ({players.length})
          </h2>
          {players.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <div className="text-gray-500 dark:text-gray-400 mb-2">No players added yet</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add your first player using the form above
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {players.map((player) => (
                <li key={player.id} className="py-3 flex flex-row justify-between items-center">
                  <span className="text-gray-800 dark:text-white font-medium">{player.name}</span>
                  <Button
                    onClick={() => handleRemovePlayer(player.id)}
                    variant="danger"
                    size="small"
                    className="cursor-pointer flex items-center"
                  >
                    <HiOutlineUserRemove className="mr-1" /> Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {players.length > 0 && (
          <Card className="text-center p-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Ready to Start a Match?</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Use this squad to set up a starting lineup and manage substitutions.
            </p>
            <Button 
              onClick={handleUseSquadForMatch}
              variant="success"
              size="large"
              className="cursor-pointer"
            >
              <HiOutlinePlay className="mr-2" /> Set Up Match With This Squad
            </Button>
          </Card>
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

      {/* Edit Squad Modal */}
      <EditSquadNameModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        squad={squadData}
        onUpdate={handleUpdateSquad}
      />
    </div>
  );
}

export default SquadPlayersScreen;