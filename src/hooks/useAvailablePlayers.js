import { useState, useEffect } from 'react';

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