import { Player } from '../../../types/GameTypes';

export function getTotalPlayTime(player: Player | undefined, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player) {
    return 0;
  }
  if (player.isGoalkeeper && !includeGKPlaytime) {
    return 0;
  }
  let additional = 0;
  if (isRunning && player.lastStart) {
    additional = Date.now() - player.lastStart;
  }
  return (player.playTime || 0) + additional;
}

export function handlePlayerAdjustment(players: Player[], playerId: number | string, isAdding: boolean): Player[] {
  if (isAdding) {
    const exists = players.some(p => p.id === playerId);
    if (!exists) {
      const newPlayer: Player = { 
        id: playerId, 
        name: `Player ${playerId}`, 
        playTime: 0, 
        isOnField: true, 
        isGoalkeeper: false 
      };
      return [...players, newPlayer];
    }
    return players;
  } else {
    return players.filter(p => p.id !== playerId);
  }
}

export function updatePlayerLists(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}