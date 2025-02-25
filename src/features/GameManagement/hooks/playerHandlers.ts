import { processPlayerLists } from '../../../shared/models/playerUtils';
import type { Player } from '../../../types/GameTypes';
import { handlePlayerAdjustment as adjustPlayer } from '../../../shared/models/playerAdjustments';

interface Position {
  x: number;
  y: number;
}

export function updatePlayerLists(
  playerData: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const { onField, offField } = processPlayerLists(
    playerData.filter((p) => p.isInMatchSquad),
    includeGKPlaytime,
    isRunning
  );
  return { onField, offField };
}

export function assignGoalkeeper(
  goalkeeper: string | undefined,
  playerData: Player[],
  setGoalkeeper: (id: string | undefined) => void
): void {
  if (!goalkeeper && playerData.length > 0) {
    // Find a goalkeeper with a position object
    const firstGK = playerData.find((p) => {
      if (typeof p.position === 'object' && p.position !== null) {
        return p.isGoalkeeper;
      }
      return false;
    });
    
    setGoalkeeper(firstGK?.id || playerData[0]?.id);
  }
}

export function handlePlayerAdjustment(
  playerId: string | number,
  setPlayerData: (update: (prev: Player[]) => Player[]) => void,
  isAdding: boolean
): void {
  setPlayerData((prevPlayers) => adjustPlayer(prevPlayers, playerId, isAdding));
}