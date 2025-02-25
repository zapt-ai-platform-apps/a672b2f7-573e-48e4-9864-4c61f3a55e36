export interface GameInterval {
  start: number;
  end?: number;
}

export function computeTimeElapsed(intervals: GameInterval[], isRunning: boolean): number {
  let total = 0;
  const now = Date.now();
  intervals.forEach(interval => {
    if (typeof interval.start === 'number') {
      const endTime = interval.end ? interval.end : (isRunning ? now : interval.start);
      total += endTime - interval.start;
    }
  });
  return total;
}

export function toggleTimerLogic(isRunning: boolean, gameIntervals: GameInterval[]): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const now = Date.now();
  if (!isRunning) {
    return { newIntervals: [...gameIntervals, { start: now }], newIsRunning: true };
  } else {
    if (gameIntervals.length === 0) {
      return { newIntervals: [], newIsRunning: false };
    }
    const newIntervals = [...gameIntervals];
    const lastInterval = newIntervals[newIntervals.length - 1];
    if (!lastInterval.end) {
      lastInterval.end = now;
    }
    return { newIntervals, newIsRunning: false };
  }
}

export function getValidIntervals(intervals: GameInterval[]): GameInterval[] {
  return intervals.filter(interval => typeof interval.start === 'number');
}