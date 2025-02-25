import { Player } from '../../types/GameTypes';

export function calculateTotalPlayTime(
  player: Player,
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  if (!player.playIntervals || player.playIntervals.length === 0) {
    return player.totalPlayTime || 0;
  }

  let total = 0;
  
  for (const interval of player.playIntervals) {
    if (!includeGKPlaytime && interval.isGoalkeeper) {
      continue;
    }
    
    const start = interval.start || interval.startTime || 0;
    const end = interval.end || interval.endTime || (isRunning && player.isOnField ? Date.now() : start);
    
    if (end > start) {
      total += Math.floor((end - start) / 1000);
    }
  }
  
  return total;
}

export function updatePlayerLists(
  players: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const updatedPlayers = players.map(player => ({
    ...player,
    calculatedPlayTime: calculateTotalPlayTime(player, includeGKPlaytime, isRunning)
  }));
  
  const sortedPlayers = [...updatedPlayers].sort((a, b) =>
    (b.calculatedPlayTime || 0) - (a.calculatedPlayTime || 0)
  );
  
  const onField = sortedPlayers.filter(p => p.isOnField);
  const offField = sortedPlayers.filter(p => !p.isOnField);
  
  return { onField, offField };
}