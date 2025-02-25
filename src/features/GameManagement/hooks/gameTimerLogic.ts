export interface GameInterval {
  start: number;
  end?: number;
}

export function getValidIntervals(intervals: GameInterval[]): GameInterval[] {
  return intervals.filter(interval => interval.end !== undefined || interval.end === undefined);
}

export function computeTimeElapsed(intervals: GameInterval[], isRunning: boolean): number {
  let total = 0;
  intervals.forEach(interval => {
    const endTime = interval.end !== undefined ? interval.end : (isRunning ? Date.now() : interval.start);
    total += endTime - interval.start;
  });
  return Math.floor(total / 1000);
}

export function toggleTimerLogic(isRunning: boolean, intervals: GameInterval[]) {
  const now = Date.now();
  let newIntervals = [...intervals];
  let newIsRunning = !isRunning;
  if (isRunning) {
    if (newIntervals.length > 0) {
      newIntervals[newIntervals.length - 1] = { ...newIntervals[newIntervals.length - 1], end: now };
    }
  } else {
    newIntervals = [...newIntervals, { start: now }];
  }
  return { newIntervals, newIsRunning };
}