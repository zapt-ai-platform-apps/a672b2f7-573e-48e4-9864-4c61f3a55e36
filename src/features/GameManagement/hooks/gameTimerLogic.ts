export interface GameInterval {
  start: number;
  end?: number | null;
}

export function computeTimeElapsed(gameIntervals: GameInterval[], isRunning: boolean): number {
  let total = 0;
  for (const interval of gameIntervals) {
    total += (interval.end ?? Date.now()) - interval.start;
  }
  return Math.floor(total / 1000);
}

export function toggleTimerLogic(isRunning: boolean, gameIntervals: GameInterval[]): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const newIntervals = [...gameIntervals];
  if (!isRunning) {
    newIntervals.push({ start: Date.now(), end: null });
    return { newIntervals, newIsRunning: true };
  } else {
    if (newIntervals.length > 0) {
      newIntervals[newIntervals.length - 1] = { ...newIntervals[newIntervals.length - 1], end: Date.now() };
    }
    return { newIntervals, newIsRunning: false };
  }
}