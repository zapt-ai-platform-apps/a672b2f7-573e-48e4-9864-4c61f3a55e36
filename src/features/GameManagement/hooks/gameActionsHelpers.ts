import { recordGoal as addGoal } from '../../../shared/models/scoreOperations';
import { handlePlayerAdjustment as handlePlayerAdjustmentModel } from '../../../shared/models/playerAdjustments';
import { processPlayerLists } from '../../../shared/models/listUtils';
import { getTimeElapsed } from './gameTimerOperations';
import type { Goal, Player } from '../../../types/GameTypes';

export interface GameInterval {
  startTime: number;
  endTime: number | null;
}

export interface GoalRecordResult {
  updatedGoals: Goal[];
  updatedOurScore: number;
  updatedOpponentScore: number;
}

export interface PlayerLists {
  onField: Player[];
  offField: Player[];
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: Goal[],
  gameIntervals: GameInterval[],
  isRunning: boolean
): GoalRecordResult {
  const timeElapsed = getTimeElapsed(gameIntervals, isRunning);
  // Fixed: Removed the extra parameters (goals, timeElapsed) from addGoal call
  const result = addGoal(team, scorerName, ourScore, opponentScore);
  
  return {
    updatedGoals: result.newGoals,
    updatedOurScore: result.newOurScore,
    updatedOpponentScore: result.newOpponentScore
  };
}

export function handlePlayerAdjustment(
  prevPlayerData: Player[],
  playerId: string | number,
  isAdding: boolean
): Player[] {
  return handlePlayerAdjustmentModel(prevPlayerData, playerId, isAdding);
}

export function updatePlayerLists(
  playerData: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): PlayerLists {
  return processPlayerLists(playerData, includeGKPlaytime, isRunning);
}