import { Player } from '../../../types/GameTypes';

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (player.isGoalKeeper && !includeGKPlaytime) {
    return 0;
  }
  let additional = 0;
  if (isRunning && player.lastStart) {
    additional = Date.now() - player.lastStart;
  }
  return (player.playTime || 0) + additional;
}

export function getTimeElapsed(gameIntervals: number[], isRunning: boolean): number {
  let total = 0;
  for (let i = 0; i < gameIntervals.length; i += 2) {
    if (gameIntervals[i + 1]) {
      total += gameIntervals[i + 1] - gameIntervals[i];
    } else {
      total += Date.now() - gameIntervals[i];
    }
  }
  return total;
}

export function toggleTimer(isRunning: boolean, gameIntervals: number[]): { newIntervals: number[], newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...gameIntervals];
  let newIsRunning = !isRunning;
  if (!isRunning) {
    newIntervals.push(now);
  } else {
    newIntervals.push(now);
  }
  return { newIntervals, newIsRunning };
}

export function recordGoal(team: 'our' | 'opponent', scorerName: string, ourScore: number, opponentScore: number, goals: any, gameIntervals: number[], isRunning: boolean): { newOurScore: number, newOpponentScore: number, newGoals: any } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  const newGoal = { team, scorer: scorerName, time: getTimeElapsed(gameIntervals, isRunning) };
  const newGoals = goals ? [...goals, newGoal] : [newGoal];

  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(players: Player[], playerId: number | string, isAdding: boolean): Player[] {
  if (isAdding) {
    const exists = players.some(p => p.id === playerId);
    if (!exists) {
      const newPlayer: Player = { id: playerId, name: `Player ${playerId}`, playTime: 0, isOnField: true, isGoalKeeper: false };
      return [...players, newPlayer];
    }
    return players;
  } else {
    return players.filter(p => p.id !== playerId);
  }
}

export function updatePlayerLists(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}