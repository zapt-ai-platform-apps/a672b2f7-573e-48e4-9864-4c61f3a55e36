/**
 * @typedef {Object} Player
 * @property {number|string} id - Unique identifier.
 * @property {string} name - Name of the player.
 * @property {number} playTime - Total play time.
 * @property {Array<{startTime: number, endTime: number|null}>} [playIntervals] - Array of play intervals.
 */

/**
 * Adjusts the player's playTime by incrementing or decrementing.
 * @param {Array<Player>} playerData - Array of player objects.
 * @param {number|string} playerId - Identifier of the player to adjust.
 * @param {boolean} isAdding - If true, increment playTime; otherwise, decrement.
 * @returns {Array<Player>} The updated array of player objects.
 */
export function handlePlayerAdjustment(playerData, playerId, isAdding) {
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
 * @param {Array<Player>} playerData - Array of player objects.
 * @param {string} adjustmentType - Type of adjustment ("increase" or "decrease").
 * @param {Player} selectedPlayer - The player object to adjust.
 * @param {boolean} isRunning - Indicates if the game is currently running.
 * @returns {Array<Player>} The updated array of player objects.
 */
export function applyPlayerAdjustment(playerData, adjustmentType, selectedPlayer, isRunning) {
  return playerData.map(player => {
    if (player.id === selectedPlayer.id) {
      if (adjustmentType === "increase") {
        const updatedIntervals = isRunning
          ? [...(player.playIntervals || []), { startTime: Date.now(), endTime: null, isGoalkeeper: player.isGoalkeeper }]
          : (player.playIntervals || []);
        return { ...player, isOnField: true, playIntervals: updatedIntervals };
      } else if (adjustmentType === "decrease") {
        let updatedIntervals = player.playIntervals || [];
        if (isRunning && updatedIntervals.length > 0 && !updatedIntervals[updatedIntervals.length - 1].endTime) {
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