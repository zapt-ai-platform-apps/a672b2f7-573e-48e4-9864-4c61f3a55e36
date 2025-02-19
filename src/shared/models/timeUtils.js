export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  if (player.playIntervals && Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        total += Date.now() - interval.startTime;
      }
    }
  }
  if (player.position === 'Goalkeeper' && !includeGKPlaytime) {
    return 0;
  }
  return Math.floor(total / 1000);
}

export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}

export function calculateElapsedTime(gameIntervals, isRunning) {
  let total = 0;
  if (Array.isArray(gameIntervals)) {
    gameIntervals.forEach(interval => {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        total += Date.now() - interval.startTime;
      }
    });
  }
  return Math.floor(total / 1000);
}

export function calculateMinPlayTime(players) {
  if (!players || players.length === 0) return 0;
  return Math.min(...players.map(p => p.totalPlayTime || 0));
}