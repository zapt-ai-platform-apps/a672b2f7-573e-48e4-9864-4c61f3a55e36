import { Player } from '../../types/GameTypes';

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
 * @returns Total play time in seconds
 */
export function calculateTotalPlayTime(player: Player, includeGKTime: boolean): number {
  if (!player.playIntervals) return 0;
  
  let totalTime = 0;
  
  for (const interval of player.playIntervals) {
    if (!includeGKTime && interval.isGoalkeeper) continue;
    
    const start = interval.start;
    const end = interval.end ?? Date.now() / 1000;
    totalTime += end - start;
  }
  
  return Math.floor(totalTime);
}