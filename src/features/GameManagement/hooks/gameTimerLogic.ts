// Define game interval type
export interface GameInterval {
  start: number;
  end?: number;
}

/**
 * Calculate time elapsed in seconds from game intervals
 */
export function computeTimeElapsed(intervals: GameInterval[], isRunning: boolean): number {
  let totalSeconds = 0;
  const now = Date.now();
  
  intervals.forEach(interval => {
    const start = interval.start || 0;
    // If the interval is still open and the timer is running, calculate to current time
    const end = interval.end || (isRunning ? now : start);
    totalSeconds += (end - start) / 1000;
  });
  
  return Math.floor(totalSeconds);
}

/**
 * Filter intervals to only include valid ones
 */
export function getValidIntervals(intervals: GameInterval[]): GameInterval[] {
  return intervals.filter(interval => 
    interval.start && 
    (interval.end === undefined || interval.end > interval.start)
  );
}

/**
 * Toggle game timer state
 */
export function toggleTimerLogic(
  isRunning: boolean,
  intervals: GameInterval[]
): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...intervals];
  
  if (!isRunning) {
    // Starting the timer - add a new open interval
    newIntervals.push({ start: now });
  } else {
    // Stopping the timer - close the last interval
    if (newIntervals.length > 0) {
      const lastIndex = newIntervals.length - 1;
      if (!newIntervals[lastIndex].end) {
        newIntervals[lastIndex] = {
          ...newIntervals[lastIndex],
          end: now
        };
      }
    }
  }
  
  return { 
    newIntervals, 
    newIsRunning: !isRunning 
  };
}