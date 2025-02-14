export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  if (!player || !player.playIntervals) return 0;
  let total = 0;
  const now = Date.now();
  for (const interval of player.playIntervals) {
    if (!interval.end && isRunning) {
      total += now - interval.start;
    } else if (interval.end) {
      total += interval.end - interval.start;
    }
  }
  return total;
}

export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(player => player.isOnField === true);
  const offField = playerData.filter(player => player.isOnField === false);
  return { onField, offField };
}

export function calculateElapsedTime(gameIntervals, isRunning) {
  let elapsed = 0;
  if (!gameIntervals || !Array.isArray(gameIntervals)) return elapsed;
  const now = Date.now();
  for (const interval of gameIntervals) {
    if (interval.end) {
      elapsed += interval.end - interval.start;
    } else if (isRunning) {
      elapsed += now - interval.start;
    }
  }
  return elapsed;
}