import React, { useState, useEffect } from 'react';
import { Modal } from '@/modules/ui/components/Modal';
import { useSquads } from '@/modules/squads/api';
import { useAppContext } from '@/app/context/AppProvider';
import * as Sentry from '@sentry/browser';

function AddPlayerModal({ isOpen, onClose, onAddPlayer }) {
  const { getSquadPlayers } = useSquads();
  const { playerData } = useAppContext();
  
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get squad ID from localStorage (saved when navigating from SquadPlayersScreen)
  const squadId = localStorage.getItem('current_squad_id');
  
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchAvailablePlayers = async () => {
      setError(null);
      
      if (!squadId) {
        setError('No squad selected. You can manually enter a player name below.');
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching available players for squad ID:', squadId);
        const squadPlayers = await getSquadPlayers(squadId);
        console.log('Fetched squad players:', squadPlayers);
        
        // Filter out players that are already in the match squad
        const matchPlayerNames = playerData.map(player => player.name);
        console.log('Current match players:', matchPlayerNames);
        
        const filteredPlayers = squadPlayers.filter(
          player => !matchPlayerNames.includes(player.name)
        );
        console.log('Available players for selection:', filteredPlayers);
        
        setAvailablePlayers(filteredPlayers);
        
        if (filteredPlayers.length === 0) {
          setError('All squad players are already in the match. You can manually enter a new player below.');
        }
      } catch (error) {
        console.error('Failed to fetch available players:', error);
        Sentry.captureException(error);
        setError('Failed to load squad players. You can manually enter a player name below.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailablePlayers();
    
    // Reset state when modal opens
    setSelectedPlayer('');
    setPlayerName('');
  }, [isOpen, squadId, playerData, getSquadPlayers]);
  
  const handleAddPlayer = () => {
    // If a player is selected from dropdown, use that, otherwise use manually entered name
    const nameToAdd = selectedPlayer || playerName.trim();
    
    if (nameToAdd) {
      onAddPlayer(nameToAdd);
      setSelectedPlayer('');
      setPlayerName('');
      onClose();
    }
  };
  
  // When a player is selected from dropdown, update the text field too
  useEffect(() => {
    if (selectedPlayer) {
      setPlayerName(selectedPlayer);
    }
  }, [selectedPlayer]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Player"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 mr-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAddPlayer}
            disabled={!playerName.trim() && !selectedPlayer}
            className="px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-8 w-8 border-4 border-brand-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            {availablePlayers.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select from squad players not in the match:
                </label>
                <select
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 box-border"
                  value={selectedPlayer}
                  onChange={(e) => setSelectedPlayer(e.target.value)}
                >
                  <option value="">Select a player</option>
                  {availablePlayers.map((player) => (
                    <option key={player.id} value={player.name}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {error && (
              <div className="text-amber-600 dark:text-amber-400 text-sm mt-2 mb-2">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {availablePlayers.length > 0 ? 'Or manually enter player name:' : 'Enter player name:'}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 box-border"
                placeholder="Player Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default AddPlayerModal;