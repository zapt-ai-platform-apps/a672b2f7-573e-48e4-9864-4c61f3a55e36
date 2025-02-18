export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  if (player.playIntervals && player.playIntervals.length > 0) {
    player.playIntervals.forEach(interval => {
      if (interval.end) {
        total += interval.end - interval.start;
      } else if (isRunning) {
        total += Date.now() - interval.start;
      }
    });
  }
  return total;
}

export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(player => {
    if (player.playIntervals && player.playIntervals.length > 0) {
      return player.playIntervals.length % 2 !== 0;
    }
    return false;
  });
  const offField = playerData.filter(player => {
    if (player.playIntervals && player.playIntervals.length > 0) {
      return player.playIntervals.length % 2 === 0;
    }
    return true;
  });
  return { onField, offField };
}

export function calculateElapsedTime(gameIntervals, isRunning) {
  let total = 0;
  gameIntervals.forEach(interval => {
    if (interval.end) {
      total += interval.end - interval.start;
    } else if (isRunning) {
      total += Date.now() - interval.start;
    }
  });
  return total;
}