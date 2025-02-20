import { recordGoal as recordGoalModel } from '../../../shared/models/scoreModel.ts';
import { handlePlayerAdjustment as handlePlayerAdjustmentModel } from '../../../shared/models/playerAdjustments.ts';
import { processPlayerLists } from '../../../shared/models/listUtils.ts';
import { Goal, Player } from '../../../context/StateContext';

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
  return recordGoalModel(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
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