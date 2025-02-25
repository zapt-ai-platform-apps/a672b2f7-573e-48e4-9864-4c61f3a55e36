export interface GameInterval {
  start: number;
  end?: number;
}

export function computeTimeElapsed(gameIntervals: GameInterval[], isRunning: boolean): number {
  let total = 0;
  const now = Date.now();
  for (const interval of gameIntervals) {
    const end = interval.end ? interval.end : (isRunning ? now : interval.start);
    total += end - interval.start;
  }
  return Math.floor(total / 1000);
}

export function toggleTimerLogic(isRunning: boolean, gameIntervals: GameInterval[]): { newIntervals: GameInterval[], newIsRunning: boolean } {
  const now = Date.now();
  if (isRunning) {
    let newIntervals = [...gameIntervals];
    if (newIntervals.length > 0 && !newIntervals[newIntervals.length - 1].end) {
      newIntervals[newIntervals.length - 1] = { ...newIntervals[newIntervals.length - 1], end: now };
    }
    return { newIntervals, newIsRunning: false };
  } else {
    let newIntervals = [...gameIntervals, { start: now }];
    return { newIntervals, newIsRunning: true };
  }
}