export function getTotalPlayTime(player: any, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player || !player.playIntervals) {
    return 0;
  }
  
  let total = 0;
  if (Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      if (interval.end) {
        total += interval.end - interval.start;
      } else if (isRunning) {
        total += Date.now() - interval.start;
      }
    }
  }
  return total;
}

export function handlePlayerAdjustment(playerData: any[], playerId: number | string, isAdding: boolean): any[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

export function updatePlayerLists(playerData: any[], includeGKPlaytime: boolean, isRunning: boolean): { onField: any[]; offField: any[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}