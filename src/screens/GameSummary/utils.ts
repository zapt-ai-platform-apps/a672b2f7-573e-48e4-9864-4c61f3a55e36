import { Player, Goal } from '../../types/GameTypes';

export function calculatePlayTime(player: Player): number {
  // Use the totalPlayTime property directly if it exists
  if (typeof player.totalPlayTime === 'number') {
    return player.totalPlayTime;
  }
  
  // Otherwise, calculate from playIntervals if available
  if (player.playIntervals && player.playIntervals.length > 0) {
    let total = 0;
    player.playIntervals.forEach(interval => {
      if (interval.start && interval.end) {
        total += (interval.end - interval.start);
      }
    });
    return Math.floor(total / 1000);
  }
  
  // Fall back to playTime if nothing else is available
  return Math.floor((player.playTime || 0) / 1000);
}

export function formatPlayTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export function getGameDuration(players: Player[]): number {
  let maxEndTime = 0;
  
  players.forEach(player => {
    if (player.playIntervals && player.playIntervals.length > 0) {
      player.playIntervals.forEach(interval => {
        if (interval.end && interval.end > maxEndTime) {
          maxEndTime = interval.end;
        }
      });
    }
  });
  
  if (maxEndTime === 0) {
    // Fallback if no intervals found
    const maxPlayTime = Math.max(...players.map(p => p.totalPlayTime || 0)) * 1000;
    return Math.floor(maxPlayTime / 1000);
  }
  
  return Math.floor(maxEndTime / 1000);
}

export function sortGoalsByTime(goals: Goal[]): Goal[] {
  return [...goals].sort((a, b) => a.time - b.time);
}