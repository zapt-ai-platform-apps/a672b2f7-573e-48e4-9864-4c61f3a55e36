import { getTimeElapsed } from './timeOperations';
import { Player } from '../../../types/GameTypes';

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  intervals: { startTime: number; endTime: number | null }[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  const goalTime = getTimeElapsed(intervals, isRunning);
  const newGoal = { team, scorerName, time: goalTime };
  const newGoals = [...goals, newGoal];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(
  players: Player[],
  playerId: number | string,
  isAdding: boolean
): Player[] {
  return players.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

export function updatePlayerLists(
  players: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = players.filter(player => player.isOnField);
  const offField = players.filter(player => !player.isOnField);
  return { onField, offField };
}