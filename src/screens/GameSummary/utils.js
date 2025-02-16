export function getTotalPlayTime(player, includeGKPlaytime) {
  let total = 0;
  // Ensure that we always have an array for playIntervals
  const intervals = Array.isArray(player.playIntervals) ? player.playIntervals : [];
  intervals.forEach((interval) => {
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