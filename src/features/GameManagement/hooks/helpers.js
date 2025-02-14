export function calculateTotalPlayTime(player, includeGKPlaytime, isRunning) {
  if (!player || !player.playIntervals) return 0;
  let total = 0;
  player.playIntervals.forEach((interval) => {
    if (!includeGKPlaytime && interval.isGoalkeeper) return;
    if (interval.endTime) {
      total += interval.endTime - interval.startTime;
    } else if (isRunning && interval.startTime) {
      total += Date.now() - interval.startTime;
    }
  });
  return Math.floor(total / 1000);
}

export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const getTotalPlayTimeForPlayer = (player) => calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
  const onField = playerData
    .filter((player) => player.isOnField)
    .sort((a, b) => getTotalPlayTimeForPlayer(a) - getTotalPlayTimeForPlayer(b));
  const offField = playerData
    .filter((player) => !player.isOnField)
    .sort((a, b) => getTotalPlayTimeForPlayer(a) - getTotalPlayTimeForPlayer(b));
  return { onField, offField };
}

export function calculateElapsedTime(gameIntervals, isRunning) {
  let total = 0;
  gameIntervals.forEach((interval) => {
    if (interval.endTime) {
      total += interval.endTime - interval.startTime;
    } else if (isRunning && interval.startTime) {
      total += Date.now() - interval.startTime;
    }
  });
  const seconds = Math.floor(total / 1000);
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${remaining < 10 ? '0' : ''}${remaining}`;
}