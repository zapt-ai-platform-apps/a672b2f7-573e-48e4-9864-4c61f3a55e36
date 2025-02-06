import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { parsePlayers } from '../../../lib/utils';

function useMatchSquad() {
  const [matchSquadPlayers, setMatchSquadPlayers] = useState([]);
  const { selectedSquad } = useStateContext();

  useEffect(() => {
    if (selectedSquad?.players) {
      const playersArray = Array.isArray(selectedSquad.players)
        ? selectedSquad.players
        : parsePlayers(selectedSquad.players);
        
      const initialPlayers = playersArray.map((name, index) => ({
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