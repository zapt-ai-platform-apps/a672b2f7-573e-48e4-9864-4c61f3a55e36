interface Interval {
  startTime: number;
  endTime: number | null;
}

/**
 * Calculates the elapsed time for the game.
 * @param gameIntervals - Array of game intervals.
 * @param isRunning - Indicates if the game is running.
 * @returns Elapsed time in seconds.
 */
export function getTimeElapsed(
  gameIntervals: Interval[],
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
  intervals: Interval[]
): { newIntervals: Interval[]; newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...intervals];
  
  if (!isRunning) {
    // Start new interval
    newIntervals.push({ startTime: now, endTime: null });
    return { newIntervals, newIsRunning: true };
  } else {
    // End current interval
    if (newIntervals.length > 0) {
      const lastIndex = newIntervals.length - 1;
      if (newIntervals[lastIndex].endTime === null) {
        newIntervals[lastIndex] = {
          ...newIntervals[lastIndex],
          endTime: now
        };
      }
    }
    return { newIntervals, newIsRunning: false };
  }
}