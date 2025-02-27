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
 * Calculates total play time for a player
 * @param player - Player object with play intervals
 * @param includeGKPlaytime - Whether to include goalkeeper playtime
 * @param isRunning - Whether the timer is currently running
 * @returns Total playtime in seconds
 */
export function getTotalPlayTime(
  player: any,
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  if (!player || !player.playIntervals) {
    return 0;
  }
  
  let total = 0;
  if (Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      if (interval.isGoalkeeper && !includeGKPlaytime) {
        continue;
      }
      
      if (interval.end) {
        total += interval.end - interval.start;
      } else if (isRunning) {
        total += Date.now() - interval.start;
      }
    }
  }
  return Math.floor(total / 1000);
}

/**
 * Updates the current interval or creates a new one based on running state
 */
export function toggleTimer(
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

/**
 * Converts game intervals to time intervals
 */
export function convertIntervalsToTimeIntervals(intervals: any[]): Interval[] {
  return intervals.map(interval => ({
    start: interval.start || interval.startTime || 0,
    end: interval.end || interval.endTime || null
  }));
}

export { recordGoal } from './goalOperations';