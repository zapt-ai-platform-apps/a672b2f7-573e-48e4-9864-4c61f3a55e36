import { Player } from '../../../types/GameTypes';
import {
  getTotalPlayTime,
  getTimeElapsed,
  toggleTimer,
  recordGoal,
  handlePlayerAdjustment,
  updatePlayerLists
} from '../../../models/gameManagementModel';

export function getTotalPlayTimeHelper(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  return getTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsedHelper(gameIntervals: number[], isRunning: boolean): number {
  return getTimeElapsed(gameIntervals, isRunning);
}

export function toggleTimerHelper(isRunning: boolean, gameIntervals: number[]): { newIntervals: number[]; newIsRunning: boolean } {
  return toggleTimer(isRunning, gameIntervals);
}

export function recordGoalHelper(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any,
  gameIntervals: number[],
  isRunning: boolean
) {
  return recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
}

export function handlePlayerAdjustmentHelper(playerList: Player[], playerId: number | string, isAdding: boolean): Player[] {
  return handlePlayerAdjustment(playerList, playerId, isAdding);
}

export function updatePlayerListsHelper(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean) {
  return updatePlayerLists(playerData, includeGKPlaytime, isRunning);
}