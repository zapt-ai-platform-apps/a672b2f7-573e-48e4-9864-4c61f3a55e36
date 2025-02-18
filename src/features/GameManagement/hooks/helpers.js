export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let totalTime = 0;
  if (player.playIntervals && Array.isArray(player.playIntervals)) {
    for (let interval of player.playIntervals) {
      totalTime += interval.duration || 0;
    }
  }
  return totalTime;
}

export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  return { onField: playerData, offField: [] };
}

export function calculateElapsedTime(gameIntervals, isRunning) {
  return gameIntervals.reduce((total, interval) => total + (interval.duration || 0), 0);
}