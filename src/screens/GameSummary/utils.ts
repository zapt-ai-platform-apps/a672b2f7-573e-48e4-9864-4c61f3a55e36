import { Player } from '@/types/GameTypes';

/**
 * Creates a function to calculate total play time for a player
 * @param includeGKPlaytime Whether to include goalkeeper play time
 * @returns Function to calculate total play time
 */
export function createGetTotalPlayTime(includeGKPlaytime: boolean) {
  return (player: Player): number => {
    // If player is a goalkeeper and we're not including GK playtime, return 0
    if (player.isGoalkeeper && !includeGKPlaytime) {
      return 0;
    }
    
    // Calculate from play intervals if available
    if (player.playIntervals && player.playIntervals.length > 0) {
      let totalTime = 0;
      
      player.playIntervals.forEach(interval => {
        const start = interval.start || 0;
        const end = interval.end || start;
        
        // Convert milliseconds to seconds
        totalTime += (end - start) / 1000;
      });
      
      return Math.floor(totalTime);
    }
    
    // Fall back to totalPlayTime property
    return player.totalPlayTime || 0;
  };
}

/**
 * Formats seconds into MM:SS format
 * @param seconds Number of seconds
 * @returns Formatted time string
 */
export function formatPlayTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}