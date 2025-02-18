import { useState, useEffect } from 'react';

/**
 * Custom hook to determine available players that are not currently in the game.
 * It compares the players listed in the selected squad with the players already in the current game.
 *
 * @param {Object} selectedSquad - The squad object containing a "players" property.
 * @param {Array} currentGamePlayers - Array of player objects currently in the game.
 * @returns {Array<string>} An array of available player names.
 */
export function useAvailablePlayers(selectedSquad, currentGamePlayers) {
  const [availablePlayers, setAvailablePlayers] = useState([]);

  useEffect(() => {
    if (selectedSquad) {
      let squadPlayers = [];
      if (Array.isArray(selectedSquad.players)) {
        squadPlayers = selectedSquad.players;
      } else if (selectedSquad.players) {
        squadPlayers = selectedSquad.players.split(',').map(p => p.trim()).filter(Boolean);
      }
      const currentNames = currentGamePlayers ? currentGamePlayers.map(p => p.name) : [];
      const filtered = squadPlayers.filter(name => !currentNames.includes(name));
      setAvailablePlayers(filtered);
    } else {
      setAvailablePlayers([]);
    }
  }, [selectedSquad, currentGamePlayers]);

  return availablePlayers;
}

export default useAvailablePlayers;