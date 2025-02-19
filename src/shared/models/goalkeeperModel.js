/**
 * @typedef {Object} Player
 * @property {string} name - Name of the player.
 * @property {boolean} [isOnField] - Indicates if the player is currently on the field.
 * @property {boolean} [isGoalkeeper] - Specifies if the player is a goalkeeper.
 * @property {Array<{startTime: number, endTime: number|null, isGoalkeeper?: boolean}>} [playIntervals] - Array of play intervals.
 */

/**
 * Handles the business logic for changing the goalkeeper.
 *
 * @param {Array<Player>} playerData - Array of player objects.
 * @param {string} newGoalkeeperName - The name of the new goalkeeper.
 * @param {string} previousGoalkeeperName - The name of the previous goalkeeper.
 * @param {boolean} isRunning - Indicates if the game is currently running.
 * @returns {Array<Player>} Updated array of player objects after the goalkeeper change.
 */
export function changeGoalkeeper(playerData, newGoalkeeperName, previousGoalkeeperName, isRunning) {
  const now = Date.now();
  return playerData.map(player => {
    if (player.name === newGoalkeeperName) {
      if (isRunning && player.isOnField) {
        if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
          player.playIntervals[player.playIntervals.length - 1].endTime = now;
        }
        player.playIntervals.push({ startTime: now, endTime: null, isGoalkeeper: true });
      }
      return { ...player, isGoalkeeper: true };
    } else if (player.name === previousGoalkeeperName) {
      if (isRunning && player.isOnField) {
        if (player.playIntervals.length > 0 && !player.playIntervals[player.playIntervals.length - 1].endTime) {
          player.playIntervals[player.playIntervals.length - 1].endTime = now;
        }
        player.playIntervals.push({ startTime: now, endTime: null, isGoalkeeper: false });
      }
      return { ...player, isGoalkeeper: false };
    } else {
      return player;
    }
  });
}