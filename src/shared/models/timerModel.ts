/**
 * Calculates the elapsed time for the game.
 * @param gameIntervals - Array of game intervals.
 * @param isRunning - Indicates if the game is running.
 * @returns Elapsed time in seconds.
 */
export function getTimeElapsed(
  gameIntervals: { startTime: number; endTime: number | null }[],
  isRunning: boolean
): number {
  let total = 0;
  gameIntervals.forEach(interval => {
    if (interval.endTime !== null) {
      total += interval.endTime - interval.startTime;
    } else if (isRunning) {
      total += Date.now() - interval.startTime;
    }
  });
  return Math.floor(total / 1000);
}

/**
 * Toggles the game timer.
 * @param isRunning - Current running state.
 * @param intervals - Array of game intervals.
 * @returns Updated intervals and running state.
 */
export function toggleTimer(
  isRunning: boolean,
  intervals: { startTime: number; endTime: number | null }[]
): { newIntervals: { startTime: number; endTime: number | null }[]; newIsRunning: boolean } {
  if (!isRunning) {
    const newInterval = { startTime: Date.now(), endTime: null };
    return { newIntervals: [...intervals, newInterval], newIsRunning: true };
  } else {
    if (intervals.length > 0) {
      const lastInterval = { ...intervals[intervals.length - 1] };
      if (lastInterval.endTime === null) {
        lastInterval.endTime = Date.now();
        const newIntervals = [...intervals.slice(0, intervals.length - 1), lastInterval];
        return { newIntervals, newIsRunning: false };
      }
    }
    return { newIntervals: intervals, newIsRunning: false };
  }
}