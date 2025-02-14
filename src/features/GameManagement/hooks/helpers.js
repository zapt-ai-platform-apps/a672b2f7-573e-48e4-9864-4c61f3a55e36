export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  if (!player || !player.playIntervals) {
    return total;
  }
  const now = Date.now();
  player.playIntervals.forEach(interval => {
    if (interval.start) {
      const end = interval.end !== undefined ? interval.end : (isRunning ? now : interval.start);
      total += (end - interval.start);
    }
  });
  return total;
}

export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = [];
  const offField = [];
  playerData.forEach(player => {
    const intervals = player.playIntervals || [];
    if (intervals.length > 0) {
      const lastInterval = intervals[intervals.length - 1];
      if (!lastInterval.end) {
        onField.push(player);
        return;
      }
    }
    offField.push(player);
  });
  return { onField, offField };
}

export function calculateElapsedTime(gameIntervals, isRunning) {
  let total = 0;
  const now = Date.now();
  gameIntervals.forEach(interval => {
    if (interval.start) {
      const end = interval.end !== undefined ? interval.end : (isRunning ? now : interval.start);
      total += (end - interval.start);
    }
  });
  return total;
}