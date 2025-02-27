import { Player, TimeInterval } from '../../types/GameTypes';

export function calculateTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player.playIntervals || player.playIntervals.length === 0) {
    return 0;
  }
  let totalTime = 0;
  for (const interval of player.playIntervals) {
    if (interval.isGoalkeeper && !includeGKPlaytime) {
      continue;
    }
    const start = interval.start || interval.startTime || 0;
    let end = interval.end || interval.endTime || null;
    if (end === null && isRunning) {
      end = Date.now();
    }
    if (start && end) {
      totalTime += Math.floor((end - start) / 1000);
    }
  }
  return totalTime;
}

export function calculateElapsedTime(intervals: TimeInterval[], isRunning: boolean): number {
  if (!intervals || intervals.length === 0) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const start = interval.startTime || (interval as any).start || 0;
    let end = interval.endTime || (interval as any).end || null;
    if (i === intervals.length - 1 && end === null && isRunning) {
      end = Date.now();
    }
    if (start && end) {
      total += Math.floor((end - start) / 1000);
    }
  }
  return total;
}

export function toggleTimer(
  isRunning: boolean,
  gameIntervals: TimeInterval[]
): { newIntervals: TimeInterval[], newIsRunning: boolean } {
  let newIntervals = [...gameIntervals];
  if (!isRunning) {
    newIntervals.push({ 
      startTime: Date.now(), 
      endTime: null 
    });
  } else {
    const lastIndex = newIntervals.length - 1;
    if (lastIndex >= 0 && newIntervals[lastIndex].endTime === null) {
      newIntervals = [...newIntervals];
      newIntervals[lastIndex] = {
        ...newIntervals[lastIndex],
        endTime: Date.now()
      };
    }
  }
  return {
    newIntervals,
    newIsRunning: !isRunning
  };
}

export function getTimeElapsed(gameIntervals: TimeInterval[], isRunning: boolean): number {
  return calculateElapsedTime(gameIntervals, isRunning);
}