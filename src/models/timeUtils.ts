import { Player } from '../types/GameTypes';

/**
 * Formats seconds into a string representation of minutes and seconds (MM:SS).
 * @param seconds - The total number of seconds to format
 * @returns A string in the format MM:SS with leading zeros
 */
export function formatTime(seconds: number): string {
  // Handle negative values by returning 00:00
  if (seconds < 0) {
    return '00:00';
  }
  
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculates the total minutes played based on entry and exit times.
 * @param entryTimes - Array of timestamps when the player entered the game
 * @param exitTimes - Array of timestamps when the player exited the game
 * @returns The total minutes played
 */
export function calculateMinutesPlayed(entryTimes: number[], exitTimes: number[]): number {
  if (!entryTimes || !exitTimes || entryTimes.length === 0) {
    return 0;
  }

  let totalSeconds = 0;
  for (let i = 0; i < entryTimes.length; i++) {
    const entry = entryTimes[i];
    const exit = i < exitTimes.length ? exitTimes[i] : Date.now();
    
    if (entry && exit) {
      const timePlayedMs = exit - entry;
      totalSeconds += Math.floor(timePlayedMs / 1000);
    }
  }
  
  return Math.floor(totalSeconds / 60);
}

/**
 * Calculates the total play time for a player in seconds
 * @param player - The player to calculate play time for
 * @param includeGKPlaytime - Whether to include goalkeeper play time
 * @param isRunning - Whether the game is currently running
 * @returns The total play time in seconds
 */
export function getTotalPlayTime(
  player: Player,
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  // If player doesn't have playIntervals, use totalPlayTime property
  if (!player.playIntervals || player.playIntervals.length === 0) {
    return player.totalPlayTime || 0;
  }

  let total = 0;
  
  for (const interval of player.playIntervals) {
    // Skip goalkeeper intervals if we're not including GK play time
    if (!includeGKPlaytime && interval.isGoalkeeper) {
      continue;
    }
    
    const start = interval.start || 0;
    const end = interval.end || (isRunning && player.isOnField ? Date.now() : start);
    
    if (end > start) {
      total += Math.floor((end - start) / 1000); // Convert to seconds
    }
  }
  
  return total;
}