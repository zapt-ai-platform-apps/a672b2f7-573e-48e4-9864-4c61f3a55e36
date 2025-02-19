export function getTimeElapsed(gameIntervals, isRunning) {
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

export function toggleTimer(isRunning, intervals) {
  if (!isRunning) {
    const newInterval = { startTime: Date.now(), endTime: null };
    return { newIntervals: [...intervals, newInterval], newIsRunning: true };
  } else {
    if (intervals.length > 0) {
      const lastInterval = { ...intervals[intervals.length - 1] };
      if (!lastInterval.endTime) {
        lastInterval.endTime = Date.now();
        const newIntervals = [...intervals.slice(0, intervals.length - 1), lastInterval];
        return { newIntervals, newIsRunning: false };
      }
    }
    return { newIntervals: intervals, newIsRunning: false };
  }
}