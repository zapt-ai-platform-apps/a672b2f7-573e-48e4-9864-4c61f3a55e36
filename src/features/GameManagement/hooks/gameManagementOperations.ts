import { Player } from '../../../types/GameTypes';

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  return player.totalPlayTime || 0;
}

export function getTimeElapsed(gameIntervals: number[], isRunning: boolean): number {
  let totalElapsed = 0;
  for (let i = 0; i < gameIntervals.length; i += 2) {
    if (i + 1 < gameIntervals.length) {
      totalElapsed += gameIntervals[i + 1] - gameIntervals[i];
    }
  }
  if (isRunning && gameIntervals.length % 2 === 1) {
    totalElapsed += Date.now() - gameIntervals[gameIntervals.length - 1];
  }
  return totalElapsed;
}

export function toggleTimer(isRunning: boolean, gameIntervals: number[]): { newIntervals: number[]; newIsRunning: boolean } {
  const currentTime = Date.now();
  let newIntervals: number[] = [...gameIntervals];
  let newIsRunning: boolean = isRunning;
  if (!isRunning) {
    newIntervals.push(currentTime);
    newIsRunning = true;
  } else {
    newIntervals.push(currentTime);
    newIsRunning = false;
  }
  return { newIntervals, newIsRunning };
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: number[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore++;
  } else {
    newOpponentScore++;
  }
  const time = getTimeElapsed(gameIntervals, isRunning);
  const newGoals = [...goals, { team, scorerName, time }];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(players: Player[], playerId: number | string, isAdding: boolean): Player[] {
  if (isAdding) {
    const newPlayer: Player = { id: playerId, name: 'Player ' + playerId, totalPlayTime: 0 };
    return [...players, newPlayer];
  } else {
    return players.filter(player => player.id !== playerId);
  }
}

export function updatePlayerLists(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter((_, index) => index % 2 === 0);
  const offField = playerData.filter((_, index) => index % 2 !== 0);
  return { onField, offField };
}