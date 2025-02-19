import { recordGoal as recordGoalModel } from '../../../shared/models/scoreModel.js';
import { handlePlayerAdjustment as handlePlayerAdjustmentModel } from '../../../shared/models/playerAdjustments.js';
import { processPlayerLists } from '../../../shared/models/listUtils.js';

/**
 * Forwards the recordGoal function from the score model.
 *
 * @param {string} team - Team identifier ('our' or 'opponent').
 * @param {string} scorerName - Name of the goal scorer.
 * @param {number} ourScore - Current score of our team.
 * @param {number} opponentScore - Current score of the opponent team.
 * @param {Array} goals - Array of goal events.
 * @param {Array} gameIntervals - Array of game interval objects.
 * @param {boolean} isRunning - Indicates if the game is running.
 * @returns {Object} Updated score and goals data.
 */
export function recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning) {
  return recordGoalModel(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
}

/**
 * Forwards the handlePlayerAdjustment function from the player adjustments model.
 *
 * @param {Array} prevPlayerData - Previous array of player objects.
 * @param {number|string} playerId - Identifier of the player to adjust.
 * @param {boolean} isAdding - Flag indicating whether the adjustment is an addition.
 * @returns {Array} Updated array of player objects.
 */
export function handlePlayerAdjustment(prevPlayerData, playerId, isAdding) {
  return handlePlayerAdjustmentModel(prevPlayerData, playerId, isAdding);
}

/**
 * Forwards the processPlayerLists function from the list utils.
 *
 * @param {Array} playerData - Array of player objects.
 * @param {boolean} includeGKPlaytime - Flag to include goalkeeper playtime.
 * @param {boolean} isRunning - Indicates if the game is running.
 * @returns {Object} Object containing onField and offField player arrays.
 */
export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  return processPlayerLists(playerData, includeGKPlaytime, isRunning);
}