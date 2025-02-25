import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import initializePlayers from './utils/initializePlayers';
import { toggleMatchPlayerHelper, toggleStartingPlayerHelper } from './utils/togglePlayers';
import type { Player } from '../../../context/StateContext';

function useMatchSquad() {
  const { selectedSquad } = useStateContext();

  const [matchSquadPlayers, setMatchSquadPlayers] = useState<Player[]>(initializePlayers(selectedSquad));

  useEffect(() => {
    setMatchSquadPlayers(initializePlayers(selectedSquad));
  }, [selectedSquad]);

  function toggleMatchPlayer(playerId: string): void {
    setMatchSquadPlayers((players: Player[]) => toggleMatchPlayerHelper(players, playerId));
  }

  function toggleStartingPlayer(playerId: string): void {
    setMatchSquadPlayers((players: Player[]) => toggleStartingPlayerHelper(players, playerId));
  }

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;
export type { Player };