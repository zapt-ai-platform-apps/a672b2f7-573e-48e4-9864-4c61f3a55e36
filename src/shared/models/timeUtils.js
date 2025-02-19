/**
 * @typedef {Object} Interval
 * @property {number} startTime - Start timestamp.
 * @property {number|null} endTime - End timestamp or null if ongoing.
 */

/**
 * Calculates the total play time of a player.
 * @param {Object} player - The player object.
 * @param {boolean} includeGKPlaytime - Whether to include goalkeeper playtime.
 * @param {boolean} isRunning - Indicates if the game is running.
 * @returns {number} Total play time in seconds.
 */
export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  if (player.playIntervals && Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        total += Date.now() - interval.startTime;
      }
    }
  }
  if (player.position === 'Goalkeeper' && !includeGKPlaytime) {
    return 0;
  }
  return Math.floor(total / 1000);
}

/**
 * Formats time in seconds to a MM:SS string.
 * @param {number} timeInSeconds - Time in seconds.
 * @returns {string} Formatted time as MM:SS.
 */
export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}

/**
 * Calculates the elapsed time during the game.
 * @param {Array<Interval>} gameIntervals - Array of game intervals.
 * @param {boolean} isRunning - Indicates if the game is running.
 * @returns {number} Elapsed time in seconds.
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

/**
 * Calculates the minimum play time among players.
 * @param {Array<{totalPlayTime: number}>} players - Array of players with totalPlayTime property.
 * @returns {number} Minimum play time in seconds.
 */
export function calculateMinPlayTime(players) {
  if (!players || players.length === 0) return 0;
  return Math.min(...players.map(p => p.totalPlayTime || 0));
}