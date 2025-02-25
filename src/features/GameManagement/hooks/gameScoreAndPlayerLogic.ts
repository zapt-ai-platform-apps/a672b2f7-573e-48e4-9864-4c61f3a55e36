import { recordGoal } from '../../../models/scoreCalculations';
import { handlePlayerAdjustment, updatePlayerLists } from '../../../models/playerAdjustments';
import { Player } from '../../../types/GameTypes';

export function recordGoalLogic(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any,
  gameIntervals: any,
  isRunning: boolean
) {
  return recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
}

export function handlePlayerAdjustmentLogic(playerData: Player[], playerId: string | number, isAdding: boolean): Player[] {
  return handlePlayerAdjustment(playerData, playerId, isAdding);
}

export function updatePlayerListsLogic(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  return updatePlayerLists(playerData, includeGKPlaytime, isRunning);
}