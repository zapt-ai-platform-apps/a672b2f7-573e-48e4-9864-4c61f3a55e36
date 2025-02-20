import { processPlayerLists } from '../../../shared/models/playerUtils';
import type { Player } from '../../../types/GameTypes';

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
  goalkeeper: string,
  playerData: Player[],
  setGoalkeeper: (id: string | undefined) => void
): void {
  if (!goalkeeper && playerData.length > 0) {
    const firstGK = playerData.find((p) => p.position === 'Goalkeeper');
    setGoalkeeper(firstGK?.id || playerData[0]?.id);
  }
}

export function handlePlayerAdjustment(
  playerId: string | number,
  setPlayerData: (update: (prev: Player[]) => Player[]) => void,
  isAdding: boolean
): void {
  setPlayerData((prevPlayers) => {
    return prevPlayers.map((player) => {
      if (player.id === playerId) {
        return { ...player, isInStartingLineup: isAdding };
      }
      return player;
    });
  });
}