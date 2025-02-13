import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { parsePlayers } from '../../../utils/parsePlayers.js';

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([]);
  const { selectedSquad } = useStateContext();

  useEffect(() => {
    if (selectedSquad?.players) {
      let squadPlayers = [];
      if (Array.isArray(selectedSquad.players)) {
        squadPlayers = selectedSquad.players;
      } else {
        squadPlayers = parsePlayers(selectedSquad.players);
      }
      const initialPlayers = squadPlayers.map((name, index) => ({
        id: index,
        name,
        isInMatch: false,
        isStartingPlayer: false
      }));
      setMatchSquadPlayers(initialPlayers);
    } else {
      setMatchSquadPlayers([]);
    }
  }, [selectedSquad]);

  const toggleMatchPlayer = (playerId) => {
    setMatchSquadPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  };

  return { matchSquadPlayers, toggleMatchPlayer };
}

export default useMatchSquad;