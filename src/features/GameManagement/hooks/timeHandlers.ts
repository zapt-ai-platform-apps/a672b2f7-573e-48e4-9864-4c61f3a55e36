import { calculateTotalPlayTime, calculateElapsedTime } from '../../../shared/models/timeUtils';
import type { Player } from '../../../types/GameTypes';

interface Interval {
  start: number;
  end: number | null;
}

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsed(gameIntervals: Interval[], isRunning: boolean): number {
  return calculateElapsedTime(gameIntervals, isRunning);
}

export function toggleTimer(
  setIsRunning: (value: boolean | ((prev: boolean) => boolean)) => void,
  gameIntervals: Interval[],
  setGameIntervals: (intervals: Interval[]) => void
): void {
  setIsRunning((prev) => {
    if (!prev) {
      setGameIntervals([...gameIntervals, { start: Date.now(), end: null }]);
    } else {
      const lastInterval = gameIntervals[gameIntervals.length - 1];
      if (lastInterval && lastInterval.end === null) {
        const updatedIntervals = [...gameIntervals];
        updatedIntervals[updatedIntervals.length - 1].end = Date.now();
        setGameIntervals(updatedIntervals);
      }
    }
    return !prev;
  });
}