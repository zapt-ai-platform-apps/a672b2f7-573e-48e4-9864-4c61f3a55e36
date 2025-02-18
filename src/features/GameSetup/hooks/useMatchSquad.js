import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import initializePlayers from './utils/initializePlayers.js';
import { toggleMatchPlayerHelper, toggleStartingPlayerHelper } from './utils/togglePlayers.js';

function useMatchSquad() {
  const { selectedSquad } = useStateContext();

  const [matchSquadPlayers, setMatchSquadPlayers] = useState(initializePlayers(selectedSquad));

  useEffect(() => {
    setMatchSquadPlayers(initializePlayers(selectedSquad));
  }, [selectedSquad]);

  function toggleMatchPlayer(playerId) {
    setMatchSquadPlayers(players => toggleMatchPlayerHelper(players, playerId));
  }

  function toggleStartingPlayer(playerId) {
    setMatchSquadPlayers(players => toggleStartingPlayerHelper(players, playerId));
  }

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;