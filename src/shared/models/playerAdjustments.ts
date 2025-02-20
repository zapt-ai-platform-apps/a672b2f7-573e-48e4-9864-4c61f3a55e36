export interface Player {
  id: string | number;
  playTime?: number;
  playIntervals?: { startTime: number; endTime: number | null; isGoalkeeper?: boolean }[];
  isOnField?: boolean;
  [key: string]: unknown;
}

/**
 * Adjusts the player's playTime by incrementing or decrementing.
 * @param playerData - Array of player objects.
 * @param playerId - Identifier of the player to adjust.
 * @param isAdding - If true, increment playTime; otherwise, decrement.
 * @returns The updated array of player objects.
 */
export function handlePlayerAdjustment(
  playerData: Player[],
  playerId: string | number,
  isAdding: boolean
): Player[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      if (isAdding) {
        return { ...player, playTime: (player.playTime || 0) + 1 };
      } else {
        return { ...player, playTime: Math.max((player.playTime || 0) - 1, 0) };
      }
    }
    return player;
  });
}

/**
 * Applies a player adjustment based on the adjustment type.
 * @param playerData - Array of player objects.
 * @param adjustmentType - Type of adjustment ("increase" or "decrease").
 * @param selectedPlayer - The player object to adjust.
 * @param isRunning - Indicates if the game is currently running.
 * @returns The updated array of player objects.
 */
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
            ...updatedIntervals.slice(0, -1),
            { ...updatedIntervals[updatedIntervals.length - 1], endTime: Date.now() }
          ];
        }
        return { ...player, isOnField: false, playIntervals: updatedIntervals };
      }
    }
    return player;
  });
}