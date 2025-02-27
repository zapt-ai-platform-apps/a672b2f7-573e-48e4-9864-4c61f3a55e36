import { Interval } from '../../../shared/models/timeUtils';

/**
 * Gets the total elapsed time from an array of time intervals
 * @param intervals - Array of time intervals
 * @param isRunning - Whether the timer is currently running
 * @returns Total elapsed time in seconds
 */
export function getTimeElapsed(intervals: Interval[], isRunning: boolean): number {
  let totalSeconds = 0;
  const now = Date.now();
  
  intervals.forEach(interval => {
    const start = interval.start || 0;
    const end = interval.end || (isRunning ? now : start);
    totalSeconds += (end - start) / 1000;
  });
  
  return Math.floor(totalSeconds);
}

/**
 * Updates the current interval or creates a new one based on running state
 */
export function updateGameIntervals(
  isRunning: boolean,
  intervals: Interval[]
): { newIntervals: Interval[]; newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...intervals];
  
  if (!isRunning) {
    // Starting the timer - add a new open interval
    newIntervals.push({ start: now });
  } else {
    // Stopping the timer - close the last interval
    if (newIntervals.length > 0) {
      const lastIndex = newIntervals.length - 1;
      newIntervals[lastIndex] = {
        ...newIntervals[lastIndex],
        end: now
      };
    }
  }
  
  return { 
    newIntervals, 
    newIsRunning: !isRunning 
  };
}