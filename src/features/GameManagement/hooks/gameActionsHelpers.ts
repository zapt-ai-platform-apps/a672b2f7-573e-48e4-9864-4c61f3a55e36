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
  gameIntervals: GameInterval[]
): GoalRecordResult {
  const timeElapsed = getTimeElapsed(gameIntervals, false);
  // Pass only the parameters that match the function signature in scoreOperations
  const result = addGoal(team, scorerName, timeElapsed, goals);
  
  return {
    updatedGoals: result.newGoals,
    updatedOurScore: team === 'our' ? ourScore + 1 : ourScore,
    updatedOpponentScore: team === 'opponent' ? opponentScore + 1 : opponentScore
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