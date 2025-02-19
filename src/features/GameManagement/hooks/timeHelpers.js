import { calculateTotalPlayTime } from '../../../shared/models/playerUtils.js';
import { getTimeElapsed as getTimerElapsed, toggleTimer as toggleTimerModel } from '../../../shared/models/timerModel.js';

export function getTotalPlayTime(player, includeGKPlaytime, isRunning) {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsed(gameIntervals, isRunning) {
  return getTimerElapsed(gameIntervals, isRunning);
}

export function toggleTimer(isRunning, gameIntervals) {
  return toggleTimerModel(isRunning, gameIntervals);
}