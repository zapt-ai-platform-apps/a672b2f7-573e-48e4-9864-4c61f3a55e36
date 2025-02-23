import { Player } from '../../../types/GameTypes';

export function getTotalPlayTime(player: Player | undefined, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player) return 0;
  
  let total = 0;
  const intervals = Array.isArray(player.playIntervals) ? player.playIntervals : [];
  
  for (const interval of intervals) {
    if (interval.endTime !== null) {
      total += interval.endTime - interval.startTime;
    } else if (isRunning) {
      total += Date.now() - interval.startTime;
    }
  }
  return total;
}

export function getTimeElapsed(
  intervals: { startTime: number; endTime: number | null }[],
  isRunning: boolean
): number {
  let total = 0;
  for (const interval of intervals) {
    if (interval.endTime !== null) {
      total += interval.endTime - interval.startTime;
    } else if (isRunning) {
      total += Date.now() - interval.startTime;
    }
  }
  return total;
}

export function toggleTimer(
  isRunning: boolean,
  intervals: { startTime: number; endTime: number | null }[]
): { newIntervals: { startTime: number; endTime: number | null }[]; newIsRunning: boolean } {
  if (isRunning) {
    const newIntervals = [...intervals];
    if (newIntervals.length > 0 && newIntervals[newIntervals.length - 1].endTime === null) {
      newIntervals[newIntervals.length - 1] = {
        ...newIntervals[newIntervals.length - 1],
        endTime: Date.now()
      };
    }
    return { newIntervals, newIsRunning: false };
  } else {
    const newIntervals = [...intervals, { startTime: Date.now(), endTime: null }];
    return { newIntervals, newIsRunning: true };
  }
}