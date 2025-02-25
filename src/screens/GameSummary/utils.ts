import { Player } from '../../types/GameTypes';

// Fix import path and function call
export function createGetTotalPlayTime(includeGKPlaytime: boolean) {
  return function(player: Player): number {
    // Calculate total play time based on player's play intervals
    if (!player.playIntervals) return player.totalPlayTime || 0;
    
    let totalTime = 0;
    for (const interval of player.playIntervals) {
      // Skip goalkeeper intervals if not including GK playtime
      if (!includeGKPlaytime && interval.isGoalkeeper) continue;
      
      const start = interval.start || interval.startTime || 0;
      const end = interval.end || interval.endTime || Date.now();
      totalTime += (end - start);
    }
    
    return Math.floor(totalTime / 1000); // Convert to seconds
  };
}