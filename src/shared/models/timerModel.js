/**
 * @typedef {Object} Interval
 * @property {number} startTime - Start timestamp.
 * @property {number|null} endTime - End timestamp or null if ongoing.
 */

/**
 * Calculates the elapsed time for the game.
 * @param {Array<Interval>} gameIntervals - Array of game intervals.
 * @param {boolean} isRunning - Indicates if the game is running.
 * @returns {number} Elapsed time in seconds.
 */
export function getTimeElapsed(gameIntervals, isRunning) {
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
 * Toggles the game timer.
 * @param {boolean} isRunning - Current running state.
 * @param {Array<Interval>} intervals - Array of game intervals.
 * @returns {{newIntervals: Array<Interval>, newIsRunning: boolean}} Updated intervals and running state.
 */
export function toggleTimer(isRunning, intervals) {
  if (!isRunning) {
    const newInterval = { startTime: Date.now(), endTime: null };
    return { newIntervals: [...intervals, newInterval], newIsRunning: true };
  } else {
    if (intervals.length > 0) {
      const lastInterval = { ...intervals[intervals.length - 1] };
      if (!lastInterval.endTime) {
        lastInterval.endTime = Date.now();
        const newIntervals = [...intervals.slice(0, intervals.length - 1), lastInterval];
        return { newIntervals, newIsRunning: false };
      }
    }
    return { newIntervals: intervals, newIsRunning: false };
  }
}