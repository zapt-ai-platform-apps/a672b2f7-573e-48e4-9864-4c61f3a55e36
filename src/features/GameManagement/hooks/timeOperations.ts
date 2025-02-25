import { Player } from '../../../types/GameTypes';

interface Interval {
  start: number;
  end?: number;
}

function getTotalPlayTime(player: Player | undefined, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player) return 0;
  
  // For players with playIntervals
  if (player.playIntervals && player.playIntervals.length > 0) {
    let total = 0;
    const intervals: Interval[] = player.playIntervals.map(interval => ({
      start: interval.start,
      end: interval.end
    }));
    
    intervals.forEach(interval => {
      if (interval.end) {
        total += (interval.end - interval.start);
      } else if (isRunning) {
        total += (Date.now() - interval.start);
      }
    });
    return Math.floor(total / 1000);
  }
  
  // Fallback for players using the legacy playTime property
  let additional = 0;
  if (isRunning && player.lastStart) {
    additional = Date.now() - player.lastStart;
  }
  return Math.round(((player.playTime || 0) + additional) / 1000);
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