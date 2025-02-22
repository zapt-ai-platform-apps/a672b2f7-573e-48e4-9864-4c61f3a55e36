export function getTimeElapsed(gameIntervals: number[], isRunning: boolean): number {
  let total = 0;
  for (let i = 0; i < gameIntervals.length; i += 2) {
    if (gameIntervals[i + 1]) {
      total += gameIntervals[i + 1] - gameIntervals[i];
    } else {
      total += Date.now() - gameIntervals[i];
    }
  }
  return total;
}

export function toggleTimer(isRunning: boolean, gameIntervals: number[]): { newIntervals: number[], newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...gameIntervals];
  let newIsRunning = !isRunning;
  if (!isRunning) {
    newIntervals.push(now);
  } else {
    newIntervals.push(now);
  }
  return { newIntervals, newIsRunning };
}