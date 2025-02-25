import { recordGoal, handlePlayerAdjustment, updatePlayerLists } from './gameActionsHelpers';
import type { Goal, Player } from '../../../types/GameTypes';
import type { GameInterval } from './gameActionsHelpers';

export interface RecordGoalLogicResult {
  newGoals: Goal[];
  newOurScore: number;
  newOpponentScore: number;
}

/**
 * Logic for recording a goal during the game
 */
export function recordGoalLogic(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: Goal[],
  gameIntervals: GameInterval[],
  isRunning: boolean
): RecordGoalLogicResult {
  const result = recordGoal(
    team,
    scorerName,
    ourScore,
    opponentScore,
    goals,
    gameIntervals,
    isRunning
  );

  return {
    newGoals: result.updatedGoals,
    newOurScore: result.updatedOurScore,
    newOpponentScore: result.updatedOpponentScore
  };
}

/**
 * Logic for handling player adjustments (adding/removing from field)
 */
export function handlePlayerAdjustmentLogic(
  players: Player[],
  playerId: string | number,
  isAdding: boolean
): Player[] {
  return handlePlayerAdjustment(players, playerId, isAdding);
}

/**
 * Logic for updating player lists (on-field vs. off-field)
 */
export function updatePlayerListsLogic(
  playerData: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  return updatePlayerLists(playerData, includeGKPlaytime, isRunning);
}