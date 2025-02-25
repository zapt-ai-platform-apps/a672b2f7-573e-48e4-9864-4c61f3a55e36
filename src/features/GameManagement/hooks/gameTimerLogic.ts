export interface GameInterval {
  start: number;
  end?: number;
}

export function getValidIntervals(gameIntervals: GameInterval[]): GameInterval[] {
  return gameIntervals.filter(interval => interval.start !== undefined);
}

export function computeTimeElapsed(validIntervals: GameInterval[], isRunning: boolean): number {
  const now = Date.now();
  let total = 0;
  validIntervals.forEach(interval => {
    const end = interval.end ? interval.end : (isRunning ? now : interval.start);
    total += (end - interval.start);
  });
  return total;
}

export function toggleTimerLogic(isRunning: boolean, gameIntervals: GameInterval[]): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const now = Date.now();
  if (isRunning) {
    if (gameIntervals.length > 0 && !gameIntervals[gameIntervals.length - 1].end) {
      const updatedIntervals = [...gameIntervals];
      updatedIntervals[updatedIntervals.length - 1] = {
        ...updatedIntervals[updatedIntervals.length - 1],
        end: now
      };
      return { newIntervals: updatedIntervals, newIsRunning: false };
    }
    return { newIntervals: gameIntervals, newIsRunning: false };
  } else {
    return { newIntervals: [...gameIntervals, { start: now }], newIsRunning: true };
  }
}