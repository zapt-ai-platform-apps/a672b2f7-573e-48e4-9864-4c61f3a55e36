import { Player } from '../../types/GameTypes';

/**
 * Represents a time interval for tracking player or game time
 */
export interface Interval {
  start: number;
  end?: number;
  isGoalkeeper?: boolean;
}

/**
 * Formats time in seconds to a MM:SS format
 * @param timeInSeconds - Time in seconds
 * @returns Formatted time string
 */
export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Calculates the total play time for a player
 * @param player - The player object
 * @param includeGKTime - Whether to include goalkeeper time
 * @param isRunning - Whether the game timer is currently running
 * @returns Total play time in seconds
 */
export function calculateTotalPlayTime(player: Player, includeGKTime: boolean, isRunning: boolean = false): number {
  if (!player.playIntervals) return 0;
  
  let totalTime = 0;
  const now = Date.now();
  
  for (const interval of player.playIntervals) {
    if (!includeGKTime && interval.isGoalkeeper) continue;
    
    const start = interval.start;
    // If interval is not ended and player is on field with timer running, use current time
    const end = interval.end ?? (player.isOnField && isRunning ? now : start);
    totalTime += (end - start) / 1000;
  }
  
  return Math.floor(totalTime);
}

/**
 * Calculates elapsed time from game intervals
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
 * Toggle game timer state
 * @param isRunning - Current timer running state
 * @param intervals - Current intervals array
 * @returns New intervals array and new running state
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