import { recordGoal as recordGoalModel } from '../../../shared/models/scoreModel.js';
import { handlePlayerAdjustment as handlePlayerAdjustmentModel } from '../../../shared/models/playerAdjustments.js';
import { processPlayerLists } from '../../../shared/models/listUtils.js';

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: any[],
  isRunning: boolean
): any {
  return recordGoalModel(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
}

export function handlePlayerAdjustment(
  prevPlayerData: any[],
  playerId: number | string,
  isAdding: boolean
): any[] {
  return handlePlayerAdjustmentModel(prevPlayerData, playerId, isAdding);
}

export function updatePlayerLists(
  playerData: any[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): any {
  return processPlayerLists(playerData, includeGKPlaytime, isRunning);
}