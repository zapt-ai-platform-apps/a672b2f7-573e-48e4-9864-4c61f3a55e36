export type GameInterval = {
  start: number;
  end?: number;
};

export function computeTimeElapsed(intervals: GameInterval[], isRunning: boolean): number {
  let total = 0;
  for (const interval of intervals) {
    if (interval.end) {
      total += interval.end - interval.start;
    }
  }
  if (isRunning && intervals.length > 0 && !intervals[intervals.length - 1].end) {
    total += Date.now() - intervals[intervals.length - 1].start;
  }
  return total;
}

export function toggleTimerLogic(isRunning: boolean, intervals: GameInterval[]): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const newIntervals = [...intervals];
  if (isRunning) {
    if (newIntervals.length > 0 && !newIntervals[newIntervals.length - 1].end) {
      newIntervals[newIntervals.length - 1] = {
        ...newIntervals[newIntervals.length - 1],
        end: Date.now()
      };
    }
    return { newIntervals, newIsRunning: false };
  } else {
    newIntervals.push({ start: Date.now() });
    return { newIntervals, newIsRunning: true };
  }
}