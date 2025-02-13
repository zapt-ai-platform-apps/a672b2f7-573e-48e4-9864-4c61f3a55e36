import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { parsePlayers } from '../../../utils/parsePlayers.js';

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([]);
  const { selectedSquad } = useStateContext();

  useEffect(() => {
    if (selectedSquad?.players) {
      let squadPlayers = Array.isArray(selectedSquad.players)
        ? selectedSquad.players
        : parsePlayers(selectedSquad.players);
      
      const initialPlayers = squadPlayers.map((name, index) => ({
        id: index,
        name,
        isInMatch: true, // Changed from false to true to auto-select all players
        isStartingPlayer: false
      }));

      setMatchSquadPlayers(initialPlayers);
    } else {
      setMatchSquadPlayers([]);
    }
  }, [selectedSquad]);

  const toggleMatchPlayer = (id) => {
    setMatchSquadPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  };

  const toggleStartingPlayer = (id) => {
    setMatchSquadPlayers(prev =>
      prev.map(player =>
        player.id === id ? { ...player, isStartingPlayer: !player.isStartingPlayer } : player
      )
    );
  };

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;