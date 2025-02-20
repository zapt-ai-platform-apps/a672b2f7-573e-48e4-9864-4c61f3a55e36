import { Player, Goal } from '../types/GameTypes';

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!includeGKPlaytime && player.isGoalkeeper) {
    return 0;
  }
  return player.totalPlayTime || 0;
}

export function getTimeElapsed(gameIntervals: number[], isRunning: boolean): number {
  let total = 0;
  const now = Date.now();
  for (let i = 0; i < gameIntervals.length; i += 2) {
    if (i + 1 < gameIntervals.length) {
      total += gameIntervals[i + 1] - gameIntervals[i];
    } else if (isRunning) {
      total += now - gameIntervals[i];
    }
  }
  return total;
}

export function toggleTimer(isRunning: boolean, gameIntervals: number[]): { newIntervals: number[]; newIsRunning: boolean } {
  const currentTime = Date.now();
  const newIntervals = [...gameIntervals, currentTime];
  return { newIntervals, newIsRunning: !isRunning };
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: Goal[],
  gameIntervals: number[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: Goal[] } {
  const timestamp = Date.now();
  const newGoal: Goal = { team, scorerName, timestamp };
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  return { newOurScore, newOpponentScore, newGoals: [...goals, newGoal] };
}

export function handlePlayerAdjustment(players: Player[], playerId: number | string, isAdding: boolean): Player[] {
  return players.map(player =>
    player.id === playerId ? { ...player, isOnField: isAdding } : player
  );
}

export function updatePlayerLists(players: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = players.filter(player => player.isOnField);
  const offField = players.filter(player => !player.isOnField);
  return { onField, offField };
}