import { calculateTotalPlayTime } from '../../../shared/models/playerUtils';
import { getTimeElapsed as getTimerElapsed, toggleTimer as toggleTimerModel } from '../../../shared/models/timerModel';

export function getTotalPlayTime(player: any, includeGKPlaytime: boolean, isRunning: boolean): number {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsed(gameIntervals: any[], isRunning: boolean): number {
  return getTimerElapsed(gameIntervals, isRunning);
}

export function toggleTimer(isRunning: boolean, gameIntervals: any[]): any {
  return toggleTimerModel(isRunning, gameIntervals);
}