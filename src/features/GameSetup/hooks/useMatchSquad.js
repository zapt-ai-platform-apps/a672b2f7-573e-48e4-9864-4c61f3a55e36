import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { parsePlayers } from '../../../utils/parsePlayers.js';

function useMatchSquad() {
  const { selectedSquad } = useStateContext();

  const getInitialPlayers = () => {
    if (selectedSquad && selectedSquad.players) {
      const playersArray = Array.isArray(selectedSquad.players)
        ? selectedSquad.players
        : parsePlayers(selectedSquad.players);
      return playersArray.map((playerName, index) => ({
        id: index + 1,
        name: playerName,
        isInMatch: true,
        isStartingPlayer: false
      }));
    }
    return [];
  };

  const [matchSquadPlayers, setMatchSquadPlayers] = useState(getInitialPlayers());

  useEffect(() => {
    setMatchSquadPlayers(getInitialPlayers());
  }, [selectedSquad]);

  function toggleMatchPlayer(playerId) {
    setMatchSquadPlayers(players =>
      players.map(player =>
        player.id === playerId ? { ...player, isInMatch: !player.isInMatch } : player
      )
    );
  }

  function toggleStartingPlayer(playerId) {
    setMatchSquadPlayers(players =>
      players.map(player =>
        player.id === playerId ? { ...player, isStartingPlayer: !player.isStartingPlayer } : player
      )
    );
  }

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;