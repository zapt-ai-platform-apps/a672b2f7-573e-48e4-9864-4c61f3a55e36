export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let total = 0;
  const currentTime = Date.now();
  if (player.playIntervals && Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      total += interval.end ? (interval.end - interval.start) : (currentTime - interval.start);
    }
  }
  if (!includeGKPlaytime && player.isGoalkeeper) {
    total = 0;
  }
  return total;
}

export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = [];
  const offField = [];
  if (Array.isArray(playerData)) {
    for (const player of playerData) {
      if (player.isOnField) {
        onField.push(player);
      } else {
        offField.push(player);
      }
    }
  }
  return { onField, offField };
}

export function calculateElapsedTime(gameIntervals, isRunning) {
  let elapsed = 0;
  const currentTime = Date.now();
  if (Array.isArray(gameIntervals)) {
    for (const interval of gameIntervals) {
      elapsed += interval.end ? (interval.end - interval.start) : (currentTime - interval.start);
    }
  }
  return elapsed;
}