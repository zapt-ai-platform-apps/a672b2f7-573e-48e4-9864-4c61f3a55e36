/**
 * Calculates total play time for a player.
 * @param {Object} player - The player object containing playIntervals.
 * @param {boolean} includeGKPlaytime - Whether to include goalkeeper playtime.
 * @param {boolean} isRunning - Whether the game is currently running.
 * @returns {number} Total play time in seconds.
 */
export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  if (player.playIntervals && Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      if (!includeGKPlaytime && interval.isGoalkeeper) continue;
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        total += Date.now() - interval.startTime;
      }
    }
  }
  return Math.floor(total / 1000);
}

/**
 * Formats time in seconds into "MM:SS" format.
 * @param {number} timeInSeconds - The time in seconds.
 * @returns {string} Formatted time string.
 */
export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}

/**
 * Calculates elapsed time from an array of game intervals.
 * @param {Array} gameIntervals - Array of game interval objects.
 * @param {boolean} isRunning - Whether the game is currently running.
 * @returns {number} Total elapsed time in seconds.
 */
export function calculateElapsedTime(gameIntervals, isRunning) {
  let total = 0;
  if (Array.isArray(gameIntervals)) {
    gameIntervals.forEach(interval => {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        total += Date.now() - interval.startTime;
      }
    });
  }
  return Math.floor(total / 1000);
}