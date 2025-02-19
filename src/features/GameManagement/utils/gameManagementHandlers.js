import { calculateTotalPlayTime } from '../../../shared/models/timeUtils.js';
import { toggleTimer, recordGoal, handlePlayerAdjustment, updatePlayerLists, getTimeElapsed } from '../../../shared/models/gameModel.js';

export function getTotalPlayTimeValue(player, includeGKPlaytime, isRunning) {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function updateLists(playerData, includeGKPlaytime, isRunning) {
  return updatePlayerLists(playerData, includeGKPlaytime, isRunning);
}

export function getTimeElapsedValue(gameIntervals, isRunning) {
  return getTimeElapsed(gameIntervals, isRunning);
}

export function toggleTimerHandler(isRunning, gameIntervals) {
  return toggleTimer(isRunning, gameIntervals);
}

export function recordGoalHandler(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning) {
  const time = getTimeElapsed(gameIntervals, isRunning);
  return recordGoal(team, scorerName, ourScore, opponentScore, goals, time);
}

export function handlePlayerAdjustmentHandler(playerData, playerId, isAdding) {
  return handlePlayerAdjustment(playerData, playerId, isAdding);
}