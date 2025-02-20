export interface Player {
  id: string | number;
  totalPlayTime?: number;
  playIntervals?: { startTime: number; endTime: number | null; isGoalkeeper?: boolean }[];
  isOnField?: boolean;
  [key: string]: unknown;
}

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
      if (adjustmentType === "increase") {
        const updatedIntervals = isRunning && player.isOnField
          ? [...(player.playIntervals || []), { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }]
          : (player.playIntervals || []);
        return { ...player, isOnField: true, playIntervals: updatedIntervals };
      } else if (adjustmentType === "decrease") {
        let updatedIntervals = player.playIntervals || [];
        if (isRunning && updatedIntervals.length > 0 && updatedIntervals[updatedIntervals.length - 1].endTime === null) {
          updatedIntervals = [
            ...updatedIntervals.slice(0, updatedIntervals.length - 1),
            { ...updatedIntervals[updatedIntervals.length - 1], endTime: Date.now() }
          ];
        }
        return { ...player, isOnField: false, playIntervals: updatedIntervals };
      }
    }
    return player;
  });
}