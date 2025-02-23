export interface Interval {
  startTime: number;
  endTime: number | null;
}

export function getTimeElapsed(gameIntervals: Interval[], isRunning: boolean): number {
  let total = 0;
  const now = Date.now();
  
  for (const interval of gameIntervals) {
    const end = interval.endTime || (isRunning ? now : interval.startTime);
    total += end - interval.startTime;
  }
  
  return Math.floor(total / 1000);
}

export function toggleTimer(
  isRunning: boolean,
  gameIntervals: Interval[]
): { newIntervals: Interval[]; newIsRunning: boolean } {
  const now = Date.now();
  const newIntervals = [...gameIntervals];
  
  if (!isRunning) {
    // Starting the timer - add new interval with null endTime
    newIntervals.push({ startTime: now, endTime: null });
  } else {
    // Pausing the timer - update last interval's endTime
    const lastInterval = newIntervals[newIntervals.length - 1];
    if (lastInterval && !lastInterval.endTime) {
      lastInterval.endTime = now;
    }
  }
  
  return { newIntervals, newIsRunning: !isRunning };
}