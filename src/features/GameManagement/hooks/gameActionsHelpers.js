import { recordGoal as recordGoalModel } from '../../../shared/models/scoreModel.js';

export function recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning) {
  return recordGoalModel(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
}

export function handlePlayerAdjustment(prevPlayerData, playerId, isAdding) {
  return handlePlayerAdjustmentModel(prevPlayerData, playerId, isAdding);
}

export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  return processPlayerLists(playerData, includeGKPlaytime, isRunning);
}