import { recordGoal as recordGoalModel } from '../../../shared/models/scoreModel';
import { handlePlayerAdjustment as handlePlayerAdjustmentModel } from '../../../shared/models/playerAdjustments';
import { processPlayerLists } from '../../../shared/models/listUtils';

/**
 * Forwards the recordGoal function from the score model.
 *
 * @param team - Team identifier ('our' or 'opponent').
 * @param scorerName - Name of the goal scorer.
 * @param ourScore - Current score of our team.
 * @param opponentScore - Current score of the opponent team.
 * @param goals - Array of goal events.
 * @param gameIntervals - Array of game interval objects.
 * @param isRunning - Indicates if the game is running.
 * @returns Updated score and goals data.
 */
export function recordGoal(
  team: string, 
  scorerName: string, 
  ourScore: number, 
  opponentScore: number, 
  goals: any[], 
  gameIntervals: any[], 
  isRunning: boolean
): any {
  return recordGoalModel(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
}

/**
 * Forwards the handlePlayerAdjustment function from the player adjustments model.
 *
 * @param prevPlayerData - Previous array of player objects.
 * @param playerId - Identifier of the player to adjust.
 * @param isAdding - Flag indicating whether the adjustment is an addition.
 * @returns Updated array of player objects.
 */
export function handlePlayerAdjustment(prevPlayerData: any[], playerId: number | string, isAdding: boolean): any[] {
  return handlePlayerAdjustmentModel(prevPlayerData, playerId, isAdding);
}

/**
 * Forwards the processPlayerLists function from the list utils.
 *
 * @param playerData - Array of player objects.
 * @param includeGKPlaytime - Flag to include goalkeeper playtime.
 * @param isRunning - Indicates if the game is running.
 * @returns Object containing onField and offField player arrays.
 */
export function updatePlayerLists(playerData: any[], includeGKPlaytime: boolean, isRunning: boolean): any {
  return processPlayerLists(playerData, includeGKPlaytime, isRunning);
}