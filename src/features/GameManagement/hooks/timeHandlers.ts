import { calculateTotalPlayTime, calculateElapsedTime } from '../../../shared/models/playerUtils';

export function getTotalPlayTime(player: any, includeGKPlaytime: boolean, isRunning: boolean): number {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsed(gameIntervals: any[], isRunning: boolean): number {
  return calculateElapsedTime(gameIntervals, isRunning);
}

export function toggleTimer(
  setIsRunning: (value: boolean | ((prev: boolean) => boolean)) => void,
  gameIntervals: any[],
  setGameIntervals: (intervals: any[]) => void
): void {
  setIsRunning((prev) => {
    if (!prev) {
      setGameIntervals([...gameIntervals, { start: Date.now(), end: null }]);
    } else {
      const lastInterval = gameIntervals[gameIntervals.length - 1];
      if (lastInterval && !lastInterval.end) {
        const updatedIntervals = [...gameIntervals];
        updatedIntervals[updatedIntervals.length - 1].end = Date.now();
        setGameIntervals(updatedIntervals);
      }
    }
    return !prev;
  });
}