import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import initializePlayers from './utils/initializePlayers';
import { toggleMatchPlayerHelper, toggleStartingPlayerHelper } from './utils/togglePlayers';
import type { Player } from '../../../types/GameTypes';

// Ensure that the returned Player objects have all required properties
function ensurePlayerProperties(player: Partial<Player>): Player {
  return {
    id: String(player.id || ''),
    name: player.name || '',
    totalPlayTime: player.totalPlayTime || 0,
    isOnField: player.isOnField || false,
    isGoalkeeper: player.isGoalkeeper || false,
    position: player.position || { x: null, y: null },
    playIntervals: player.playIntervals || [],
    isStartingPlayer: player.isStartingPlayer || false,
    isInMatchSquad: player.isInMatchSquad || false,
    isInStartingLineup: player.isInStartingLineup || false
  };
}

function useMatchSquad() {
  const { selectedSquad } = useStateContext();

  const [matchSquadPlayers, setMatchSquadPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Ensure all players have the required properties
    const initializedPlayers = initializePlayers(selectedSquad);
    setMatchSquadPlayers(initializedPlayers.map(ensurePlayerProperties));
  }, [selectedSquad]);

  function toggleMatchPlayer(playerId: string): void {
    setMatchSquadPlayers((players: Player[]) => {
      const updatedPlayers = toggleMatchPlayerHelper(players, playerId);
      return updatedPlayers.map(ensurePlayerProperties);
    });
  }

  function toggleStartingPlayer(playerId: string): void {
    setMatchSquadPlayers((players: Player[]) => {
      const updatedPlayers = toggleStartingPlayerHelper(players, playerId);
      return updatedPlayers.map(ensurePlayerProperties);
    });
  }

  return { matchSquadPlayers, toggleMatchPlayer, toggleStartingPlayer };
}

export default useMatchSquad;