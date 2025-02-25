export interface GameInterval {
  start: number;
  end: number | null;
}

export function computeTimeElapsed(intervals: GameInterval[], isRunning: boolean): number {
  const now = Date.now();
  let total = 0;
  for (const interval of intervals) {
    const endTime = interval.end !== null ? interval.end : now;
    total += endTime - interval.start;
  }
  return Math.floor(total / 1000);
}

export function toggleTimerLogic(isRunning: boolean, intervals: GameInterval[]): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...intervals];
  if (isRunning) {
    if (newIntervals.length > 0 && newIntervals[newIntervals.length - 1].end === null) {
      newIntervals[newIntervals.length - 1] = { ...newIntervals[newIntervals.length - 1], end: now };
    }
    return { newIntervals, newIsRunning: false };
  } else {
    newIntervals.push({ start: now, end: null });
    return { newIntervals, newIsRunning: true };
  }
}