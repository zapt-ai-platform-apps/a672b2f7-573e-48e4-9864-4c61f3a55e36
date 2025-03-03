import { useState } from 'react';
import { validatePlayer } from '@/modules/players/validators';

/**
 * State management for players module
 */
export function usePlayersState() {
  const [players, setPlayers] = useState([]);
  
  // Get a filtered list of players based on the provided filter function
  const getFilteredPlayers = (filterFn) => {
    return players.filter(filterFn);
  };
  
  // Add a new player
  const addPlayer = (playerData) => {
    try {
      validatePlayer(playerData, {
        actionName: 'addPlayer',
        location: 'players/internal/state.js:addPlayer',
        direction: 'incoming',
        moduleFrom: 'ui',
        moduleTo: 'players'
      });
      
      setPlayers(prevPlayers => [...prevPlayers, playerData]);
      return true;
    } catch (error) {
      console.error('Failed to add player:', error);
      return false;
    }
  };
  
  // Remove a player by name
  const removePlayer = (playerName) => {
    setPlayers(prevPlayers => prevPlayers.filter(p => p.name !== playerName));
    return true;
  };
  
  // Update a specific player's data
  const updatePlayer = (playerName, updates) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map(player => {
        if (player.name === playerName) {
          const updatedPlayer = { ...player, ...updates };
          try {
            validatePlayer(updatedPlayer, {
              actionName: 'updatePlayer',
              location: 'players/internal/state.js:updatePlayer',
              direction: 'internal',
              moduleFrom: 'players',
              moduleTo: 'players'
            });
            return updatedPlayer;
          } catch (error) {
            console.error(`Failed to update player ${playerName}:`, error);
            return player; // Return original if validation fails
          }
        }
        return player;
      });
      return updatedPlayers;
    });
    return true;
  };
  
  return {
    players,
    setPlayers,
    getFilteredPlayers,
    addPlayer,
    removePlayer,
    updatePlayer
  };
}