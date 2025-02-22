export function getTimeElapsed(gameIntervals: number[], isRunning: boolean): number {
  let totalElapsed = 0;
  for (let i = 0; i < gameIntervals.length; i += 2) {
    if (i + 1 < gameIntervals.length) {
      totalElapsed += gameIntervals[i + 1] - gameIntervals[i];
    }
  }
  if (isRunning && gameIntervals.length % 2 === 1) {
    totalElapsed += Date.now() - gameIntervals[gameIntervals.length - 1];
  }
  return totalElapsed;
}

export function toggleTimer(isRunning: boolean, gameIntervals: number[]): { newIntervals: number[]; newIsRunning: boolean } {
  const currentTime = Date.now();
  let newIntervals: number[] = [...gameIntervals];
  let newIsRunning: boolean = isRunning;
  if (!isRunning) {
    newIntervals.push(currentTime);
    newIsRunning = true;
  } else {
    newIntervals.push(currentTime);
    newIsRunning = false;
  }
  return { newIntervals, newIsRunning };
}