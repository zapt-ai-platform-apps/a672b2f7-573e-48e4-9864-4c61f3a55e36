import { Player } from '../types/GameTypes';

export interface Interval {
  start: number;
  end?: number;
  isGoalkeeper?: boolean;
}

/**
 * Calculate total play time for a player considering goalkeeper status
 */
export function getTotalPlayTime(
  player: Player,
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  // If we're not including goalkeeper playtime and this is a goalkeeper, return 0
  if (!includeGKPlaytime && player.isGoalkeeper) {
    return 0;
  }
  
  // Calculate from intervals if available
  if (player.playIntervals && player.playIntervals.length > 0) {
    let totalTime = 0;
    const now = Date.now();
    
    player.playIntervals.forEach(interval => {
      const start = interval.start || 0;
      // If the interval is closed, use its end time
      // If it's open and the player is on field and timer is running, calculate to current time
      const end = interval.end || (player.isOnField && isRunning ? now : start);
      
      // Convert milliseconds to seconds and add to total
      totalTime += (end - start) / 1000;
    });
    
    return Math.floor(totalTime);
  }
  
  // Fallback to totalPlayTime if available
  return player.totalPlayTime !== undefined 
    ? player.totalPlayTime + (isRunning && player.isOnField ? 1 : 0)
    : 0;
}

/**
 * Calculate elapsed time from game intervals
 */
export function getTimeElapsed(
  intervals: Interval[],
  isRunning: boolean
): number {
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