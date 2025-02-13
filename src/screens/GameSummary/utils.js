export function getTotalPlayTime(player, includeGKPlaytime) {
  let total = 0;
  player.playIntervals.forEach((interval) => {
    if (!includeGKPlaytime && interval.isGoalkeeper) return;
    if (interval.endTime) {
      total += interval.endTime - interval.startTime;
    }
  });
  return Math.floor(total / 1000);
}

export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}