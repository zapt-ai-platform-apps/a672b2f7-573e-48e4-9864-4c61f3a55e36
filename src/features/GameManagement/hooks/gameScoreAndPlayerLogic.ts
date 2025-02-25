import { Player } from '../../../types/GameTypes';
import { GameInterval } from './gameTimerLogic';

export function recordGoalLogic(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  validIntervals: GameInterval[],
  isRunning: boolean
) {
  const newGoals = [...goals, { team, scorerName, time: Date.now() }];
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustmentLogic(
  players: Player[],
  playerId: string | number,
  isAdding: boolean
): Player[] {
  return players.map(player =>
    player.id === playerId ? { ...player, isOnField: isAdding } : player
  );
}

export function updatePlayerListsLogic(
  players: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = players.filter(player => player.isOnField);
  const offField = players.filter(player => !player.isOnField);
  return { onField, offField };
}