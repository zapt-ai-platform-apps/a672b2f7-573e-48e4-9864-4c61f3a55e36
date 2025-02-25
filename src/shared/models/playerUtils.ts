import { Player } from '../../types/GameTypes';

/**
 * Calculate the total play time for a player
 */
export function calculateTotalPlayTime(
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
    
    const start = interval.start || interval.startTime || 0;
    const end = interval.end || interval.endTime || (isRunning && player.isOnField ? Date.now() : start);
    
    if (end > start) {
      total += Math.floor((end - start) / 1000); // Convert to seconds
    }
  }
  
  return total;
}

/**
 * Get list of players on field and off field
 */
export function getPlayerLists(
  players: Player[],
  includeGKPlaytime: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = players.filter(p => p.isOnField);
  const offField = players.filter(p => !p.isOnField);
  
  return { onField, offField };
}