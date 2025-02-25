import { Player } from '../types/GameTypes';

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
      // Ensure playIntervals always exists
      const existingIntervals = player.playIntervals || [];
      
      if (adjustmentType === "increase") {
        const updatedIntervals = isRunning && player.isOnField
          ? [...existingIntervals, { 
              startTime: Date.now(), 
              endTime: null, 
              isGoalkeeper: player.isGoalkeeper 
            }]
          : existingIntervals;
        return { 
          ...player, 
          isOnField: true, 
          playIntervals: updatedIntervals,
          position: player.position || { x: 0, y: 0 }
        };
      } else if (adjustmentType === "decrease") {
        let updatedIntervals = existingIntervals;
        if (isRunning && updatedIntervals.length > 0 && updatedIntervals[updatedIntervals.length - 1].endTime === null) {
          updatedIntervals = [
            ...updatedIntervals.slice(0, updatedIntervals.length - 1),
            { ...updatedIntervals[updatedIntervals.length - 1], endTime: Date.now() }
          ];
        }
        return { 
          ...player, 
          isOnField: false, 
          playIntervals: updatedIntervals,
          position: player.position || { x: 0, y: 0 }
        };
      }
    }
    return player;
  });
}