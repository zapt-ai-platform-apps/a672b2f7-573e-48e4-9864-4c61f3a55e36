import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import initializePlayers from './utils/initializePlayers';
import { toggleMatchPlayerHelper, toggleStartingPlayerHelper } from './utils/togglePlayers';

function useMatchSquad() {
  const { selectedSquad } = useStateContext();

  const [matchSquadPlayers, setMatchSquadPlayers] = useState<any[]>(initializePlayers(selectedSquad));

  useEffect(() => {
    setMatchSquadPlayers(initializePlayers(selectedSquad));
  }, [selectedSquad]);

  function toggleMatchPlayer(playerId: string) {
    setMatchSquadPlayers(players => toggleMatchPlayerHelper(players, playerId));
  }

  function toggleStartingPlayer(playerId: string) {
    setMatchSquadPlayers(players => toggleStartingPlayerHelper(players, playerId));
  }

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;