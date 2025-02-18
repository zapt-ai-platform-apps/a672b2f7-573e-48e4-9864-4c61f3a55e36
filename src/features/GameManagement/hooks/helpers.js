/**
 * Calculate the total play time for a player.
 *
 * @param {Object} player - Player object containing play intervals.
 * @param {boolean} includeGKPlaytime - Flag indicating whether to include goalkeeper play time.
 * @param {boolean} isRunning - Indicates if the game is currently running.
 * @returns {number} Total play time in milliseconds.
 */
export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  if (player.playIntervals && player.playIntervals.length > 0) {
    player.playIntervals.forEach(interval => {
      if (interval.end) {
        total += interval.end - interval.start;
      } else if (isRunning) {
        total += Date.now() - interval.start;
      }
    });
  }
  return total;
}

/**
 * Process player list to segregate players on field and off field.
 *
 * @param {Array} playerData - Array of player objects.
 * @param {boolean} includeGKPlaytime - Flag indicating whether goalkeeper playtime should be considered.
 * @param {boolean} isRunning - Indicates if the game is currently running.
 * @returns {Object} Object containing 'onField' and 'offField' arrays.
 */
export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(player => {
    if (player.playIntervals && player.playIntervals.length > 0) {
      return player.playIntervals.length % 2 !== 0;
    }
    return false;
  });
  const offField = playerData.filter(player => {
    if (player.playIntervals && player.playIntervals.length > 0) {
      return player.playIntervals.length % 2 === 0;
    }
    return true;
  });
  return { onField, offField };
}

/**
 * Calculate total elapsed time for game intervals.
 *
 * @param {Array} gameIntervals - Array of game intervals with start and end timestamps.
 * @param {boolean} isRunning - Indicates if the game is currently running.
 * @returns {number} Elapsed time in milliseconds.
 */
export function calculateElapsedTime(gameIntervals, isRunning) {
  let total = 0;
  gameIntervals.forEach(interval => {
    if (interval.end) {
      total += interval.end - interval.start;
    } else if (isRunning) {
      total += Date.now() - interval.start;
    }
  });
  return total;
}