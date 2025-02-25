export interface GameInterval {
  start: number;
  end?: number;
}

export function computeTimeElapsed(gameIntervals: GameInterval[], isRunning: boolean): number {
  let total = 0;
  for (let i = 0; i < gameIntervals.length; i++) {
    const interval = gameIntervals[i];
    if (interval.end) {
      total += interval.end - interval.start;
    } else if (isRunning && i === gameIntervals.length - 1) {
      total += Date.now() - interval.start;
    }
  }
  return total;
}

export function toggleTimerLogic(isRunning: boolean, gameIntervals: GameInterval[]): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const newIntervals = [...gameIntervals];
  if (isRunning) {
    if (newIntervals.length > 0) {
      const lastInterval = { ...newIntervals[newIntervals.length - 1], end: Date.now() };
      newIntervals[newIntervals.length - 1] = lastInterval;
    }
    return { newIntervals, newIsRunning: false };
  } else {
    newIntervals.push({ start: Date.now() });
    return { newIntervals, newIsRunning: true };
  }
}