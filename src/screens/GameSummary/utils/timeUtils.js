function getTotalPlayTime(player, includeGKPlaytime) {
  let total = 0;
  for (const interval of player.playIntervals) {
    if (!includeGKPlaytime && interval.isGoalkeeper) {
      continue;
    }
    if (interval.endTime) {
      total += interval.endTime - interval.startTime;
    }
  }
  return Math.floor(total / 1000);
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}

export { getTotalPlayTime, formatTime };