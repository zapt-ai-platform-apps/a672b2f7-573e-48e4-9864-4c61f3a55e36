import { calculateTotalPlayTime } from '../../../shared/models/timeUtils';
import { getTimeElapsed as getTimerElapsed, toggleTimer as toggleTimerModel } from '../../../shared/models/timeUtils';
import type { Player } from '../../../types/GameTypes';

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsed(gameIntervals: any[], isRunning: boolean): number {
  return getTimerElapsed(gameIntervals, isRunning);
}

export function toggleTimer(isRunning: boolean, gameIntervals: any[]): any {
  return toggleTimerModel(isRunning, gameIntervals);
}