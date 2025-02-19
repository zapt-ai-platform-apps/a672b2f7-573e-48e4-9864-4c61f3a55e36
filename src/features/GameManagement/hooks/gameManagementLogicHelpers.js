import { getTimeElapsed, toggleTimer, recordGoal, handlePlayerAdjustment, updatePlayerLists } from '../../../shared/models/gameModel';
import { calculateTotalPlayTime } from '../../../shared/models/timeUtils';

export function getTotalPlayTime(player, includeGKPlaytime, isRunning) {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsedHandler(gameIntervals, isRunning) {
  return getTimeElapsed(gameIntervals, isRunning);
}

export function toggleTimerHandler(isRunning, gameIntervals) {
  return toggleTimer(isRunning, gameIntervals);
}

export function recordGoalHandler(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning) {
  const timeElapsed = getTimeElapsed(gameIntervals, isRunning);
  return recordGoal(team, scorerName, ourScore, opponentScore, goals, timeElapsed);
}

export function handlePlayerAdjustmentHandler(playerData, playerId, isAdding) {
  return handlePlayerAdjustment(playerData, playerId, isAdding);
}

export function updatePlayerListsHandler(playerData, includeGKPlaytime, isRunning) {
  return updatePlayerLists(playerData, includeGKPlaytime, isRunning);
}