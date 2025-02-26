import { Player } from '../types/GameTypes';

/**
 * Calculate total play time for a player
 */
export function getTotalPlayTime(
  player: Player,
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  // Skip goalkeeper time if disabled and player is goalkeeper
  if (!includeGKPlaytime && player.isGoalkeeper) {
    return 0;
  }
  
  // Calculate basic time and add running time if player is on field
  const baseTime = (player.totalPlayTime || 0);
  return baseTime + (isRunning && player.isOnField ? 1 : 0);
}

/**
 * Calculate game elapsed time from intervals
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}