import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import initializePlayers from './utils/initializePlayers';
import { toggleMatchPlayerHelper, toggleStartingPlayerHelper } from './utils/togglePlayers';
import { ensurePlayerProperties } from '../utils/ensurePlayerProperties';
import type { Player } from '../../../types/GameTypes';

function useMatchSquad() {
  const { selectedSquad } = useStateContext();
  const [matchSquadPlayers, setMatchSquadPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (selectedSquad) {
      const initializedPlayers = initializePlayers(selectedSquad);
      setMatchSquadPlayers(initializedPlayers.map(player => ensurePlayerProperties(player)));
    } else {
      setMatchSquadPlayers([]);
    }
  }, [selectedSquad]);

  function toggleMatchPlayer(playerId: string): void {
    setMatchSquadPlayers((players: Player[]) => {
      const updatedPlayers = toggleMatchPlayerHelper(players, playerId);
      return updatedPlayers.map(player => ensurePlayerProperties(player));
    });
  }

  function toggleStartingPlayer(playerId: string): void {
    setMatchSquadPlayers((players: Player[]) => {
      const updatedPlayers = toggleStartingPlayerHelper(players, playerId);
      return updatedPlayers.map(player => ensurePlayerProperties(player));
    });
  }

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;