import { Player } from '../types/GameTypes';
import { addInterval, closeLastInterval, finalizeIntervals } from '../utils/intervalHelpers';

export function handlePlayerAdjustment(
  playerData: Player[],
  playerId: string | number,
  isAdding: boolean
): Player[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      if (isAdding) {
        return { ...player, totalPlayTime: (player.totalPlayTime || 0) + 1 };
      } else {
        return { ...player, totalPlayTime: Math.max((player.totalPlayTime || 0) - 1, 0) };
      }
    }
    return player;
  });
}

export function applyPlayerAdjustment(
  playerData: Player[],
  adjustmentType: 'increase' | 'decrease',
  selectedPlayer: Player,
  isRunning: boolean
): Player[] {
  return playerData.map(player => {
    if (player.id === selectedPlayer.id) {
      const existingIntervals = player.playIntervals || [];
      if (adjustmentType === "increase") {
        const updatedIntervals = addInterval(existingIntervals, player, isRunning);
        const finalIntervals = finalizeIntervals(updatedIntervals);
        return { 
          ...player, 
          isOnField: true, 
          playIntervals: finalIntervals,
          position: player.position || { x: 0, y: 0 }
        };
      } else if (adjustmentType === "decrease") {
        const updatedIntervals = closeLastInterval(existingIntervals, isRunning);
        const finalIntervals = finalizeIntervals(updatedIntervals);
        return { 
          ...player, 
          isOnField: false, 
          playIntervals: finalIntervals,
          position: player.position || { x: 0, y: 0 }
        };
      }
    }
    return player;
  });
}