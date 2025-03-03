import { useState, useCallback } from 'react';
import { validatePlayer, validatePlayers } from '../validators';
import { eventBus } from '../../core/events';
import { events } from '../events';

/**
 * Internal state management for players module
 */
export function usePlayersState() {
  const [players, setPlayers] = useState([]);

  // Update players with validation
  const updatePlayers = useCallback((newPlayers) => {
    try {
      const validatedPlayers = validatePlayers(newPlayers);
      setPlayers(validatedPlayers);
      return validatedPlayers;
    } catch (error) {
      console.error('Player validation error:', error);
      return players;
    }
  }, [players]);

  // Update a single player
  const updatePlayer = useCallback((playerName, updates) => {
    return updatePlayers(
      players.map(player => {
        if (player.name === playerName) {
          const updatedPlayer = { ...player, ...updates };
          try {
            const validatedPlayer = validatePlayer(updatedPlayer);
            eventBus.publish(events.PLAYER_UPDATED, validatedPlayer);
            return validatedPlayer;
          } catch (error) {
            console.error(`Invalid player update for ${playerName}:`, error);
            return player;
          }
        }
        return player;
      })
    );
  }, [players, updatePlayers]);
  
  // Get players by filter
  const getFilteredPlayers = useCallback((filterFn) => {
    return players.filter(filterFn);
  }, [players]);
  
  // Add a new player
  const addPlayer = useCallback((playerData) => {
    try {
      const validatedPlayer = validatePlayer(playerData);
      const newPlayers = [...players, validatedPlayer];
      setPlayers(newPlayers);
      eventBus.publish(events.PLAYER_ADDED, validatedPlayer);
      return true;
    } catch (error) {
      console.error('Failed to add player:', error);
      return false;
    }
  }, [players]);
  
  // Remove a player
  const removePlayer = useCallback((playerName) => {
    const playerToRemove = players.find(p => p.name === playerName);
    if (!playerToRemove) return false;
    
    const newPlayers = players.filter(p => p.name !== playerName);
    setPlayers(newPlayers);
    eventBus.publish(events.PLAYER_REMOVED, playerToRemove);
    return true;
  }, [players]);

  return {
    players,
    setPlayers: updatePlayers,
    updatePlayer,
    getFilteredPlayers,
    addPlayer,
    removePlayer
  };
}