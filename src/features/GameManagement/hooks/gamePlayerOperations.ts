import { Player, Position } from '../../../types/GameTypes';

export function getTotalPlayTime(player: Player | undefined, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player) {
    return 0;
  }
  
  // Skip goalkeeper playtime if not included
  if (player.isGoalkeeper && !includeGKPlaytime) {
    return 0;
  }
  
  // Use playIntervals if available
  if (player.playIntervals && player.playIntervals.length > 0) {
    let total = 0;
    player.playIntervals.forEach(interval => {
      if (interval.end) {
        total += (interval.end - interval.start);
      } else if (isRunning) {
        total += (Date.now() - interval.start);
      }
    });
    return Math.floor(total / 1000);
  }
  
  // Fall back to legacy playTime tracking
  let additional = 0;
  if (isRunning && player.lastStart) {
    additional = Date.now() - player.lastStart;
  }
  return Math.round(((player.playTime || 0) + additional) / 1000);
}

export function handlePlayerAdjustment(players: Player[], playerId: string | number, isAdding: boolean): Player[] {
  if (isAdding) {
    const exists = players.some(p => p.id === playerId.toString());
    if (!exists) {
      const newPlayer: Player = { 
        id: playerId.toString(), 
        name: `Player ${playerId}`, 
        playTime: 0,
        totalPlayTime: 0,
        position: { x: 0, y: 0 } as Position,
        isOnField: true, 
        isGoalkeeper: false,
        isInMatchSquad: false,
        isInStartingLineup: false,
        playIntervals: []
      };
      return [...players, newPlayer];
    }
    return players;
  } else {
    return players.filter(p => p.id !== playerId.toString());
  }
}

export function updatePlayerLists(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}