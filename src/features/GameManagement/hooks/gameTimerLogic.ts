import { getTimeElapsed } from '../../../models/timeUtils';
import { toggleTimer } from '../../../models/timerModel';

export interface GameInterval {
  startTime: number;
  endTime: number | null;
}

export function computeTimeElapsed(gameIntervals: GameInterval[], isRunning: boolean): number {
  const secondsArray = gameIntervals.map(interval => {
    if (interval.endTime === null) {
      return Math.floor((Date.now() - interval.startTime) / 1000);
    }
    return Math.floor((interval.endTime - interval.startTime) / 1000);
  });
  return getTimeElapsed(secondsArray, isRunning);
}

export function toggleTimerLogic(isRunning: boolean, gameIntervals: GameInterval[]): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  return toggleTimer(isRunning, gameIntervals);
}