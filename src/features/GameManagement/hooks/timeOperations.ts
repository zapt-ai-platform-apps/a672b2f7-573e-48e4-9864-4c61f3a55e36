import { Player } from '../../../types/GameTypes';

interface Interval {
  start: number;
  end?: number;
}

function getTotalPlayTime(player: Player | undefined, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player) return 0;
  
  let total = 0;
  const intervals: Interval[] = player.playIntervals || [];
  intervals.forEach(interval => {
    if (interval.end) {
      total += (interval.end - interval.start);
    } else if (isRunning) {
      total += (Date.now() - interval.start);
    }
  });
  return Math.floor(total / 1000);
}

function getTimeElapsed(gameIntervals: Interval[], isRunning: boolean): number {
  let total = 0;
  gameIntervals.forEach(interval => {
    if (interval.end) {
      total += (interval.end - interval.start);
    } else if (isRunning) {
      total += (Date.now() - interval.start);
    }
  });
  return Math.floor(total / 1000);
}

function toggleTimer(isRunning: boolean, gameIntervals: Interval[]): { newIntervals: Interval[]; newIsRunning: boolean } {
  const newIntervals = [...gameIntervals];
  if (!isRunning) {
    newIntervals.push({ start: Date.now() });
    return { newIntervals, newIsRunning: true };
  } else {
    const lastInterval = newIntervals[newIntervals.length - 1];
    if (lastInterval && !lastInterval.end) {
      lastInterval.end = Date.now();
    }
    return { newIntervals, newIsRunning: false };
  }
}

export { getTotalPlayTime, getTimeElapsed, toggleTimer };