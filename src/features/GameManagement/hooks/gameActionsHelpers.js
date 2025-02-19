import { getTimeElapsed } from './timeHelpers.js';
import { recordGoal as recordGoalModel } from '../../../shared/models/scoreModel.js';
import { handlePlayerAdjustment as handlePlayerAdjustmentModel } from '../../../shared/models/playerModel.js';
import { processPlayerLists } from '../../../shared/models/playerLists.js';

export function recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning) {
  const timeElapsed = getTimeElapsed(gameIntervals, isRunning);
  return recordGoalModel(team, scorerName, ourScore, opponentScore, goals, timeElapsed);
}

export function handlePlayerAdjustment(prevPlayerData, playerId, isAdding) {
  return handlePlayerAdjustmentModel(prevPlayerData, playerId, isAdding);
}

export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  return processPlayerLists(playerData, includeGKPlaytime, isRunning);
}