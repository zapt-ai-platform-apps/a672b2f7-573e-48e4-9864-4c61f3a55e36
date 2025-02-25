import { Player } from '../../../types/GameTypes';

export interface Interval {
  startTime?: number;
  endTime?: number | null;
  start?: number;
  end?: number | null;
}

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player || !player.playIntervals || !Array.isArray(player.playIntervals)) return 0;
  const now = Date.now();
  return player.playIntervals.reduce((total, interval: Interval) => {
    const startValue = interval.startTime !== undefined ? interval.startTime : interval.start;
    const endValue = interval.endTime !== undefined ? interval.endTime : interval.end;
    if (startValue === undefined) return total;
    const end = (endValue !== null && endValue !== undefined) ? endValue : (isRunning ? now : now);
    return total + (end - startValue);
  }, 0);
}

export function getTimeElapsed(gameIntervals: Interval[], isRunning: boolean): number {
  const now = Date.now();
  return gameIntervals.reduce((total, interval: Interval) => {
    const startValue = interval.startTime !== undefined ? interval.startTime : interval.start;
    const endValue = interval.endTime !== undefined ? interval.endTime : interval.end;
    if (startValue === undefined) return total;
    const end = (endValue !== null && endValue !== undefined) ? endValue : (isRunning ? now : now);
    return total + (end - startValue);
  }, 0);
}

export function toggleTimer(isRunning: boolean, gameIntervals: Interval[]): { newIntervals: Interval[]; newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...gameIntervals];
  let newIsRunning: boolean;
  if (isRunning) {
    newIntervals = newIntervals.map((interval, index) => {
      if (index === newIntervals.length - 1 &&
         ((interval.endTime === null) || (interval.end === null))) {
        return { ...interval, startTime: interval.startTime, endTime: now };
      }
      return interval;
    });
    newIsRunning = false;
  } else {
    newIntervals = [...newIntervals, { startTime: now, endTime: null }];
    newIsRunning = true;
  }
  return { newIntervals, newIsRunning };
}