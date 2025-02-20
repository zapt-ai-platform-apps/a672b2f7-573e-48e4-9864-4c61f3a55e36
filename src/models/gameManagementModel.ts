import { Player } from '../types/GameTypes';

export function getTotalPlayTime(
  player: Player,
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  const baseTime = (player.playTime as number) || 0;
  if (!includeGKPlaytime && player.role === 'goalkeeper') {
    return baseTime;
  }
  return baseTime + (isRunning ? 1 : 0);
}

export function getTimeElapsed(
  intervals: number[],
  isRunning: boolean
): number {
  const total = intervals.reduce((acc, curr) => acc + curr, 0);
  return total + (isRunning ? 1 : 0);
}

export function toggleTimer(
  isRunning: boolean,
  intervals: number[]
): { newIntervals: number[]; newIsRunning: boolean } {
  let newIntervals = [...intervals];
  const newIsRunning = !isRunning;
  if (!isRunning) {
    newIntervals.push(0);
  } else {
    if (newIntervals.length) {
      newIntervals[newIntervals.length - 1] = newIntervals[newIntervals.length - 1] + 10;
    }
  }
  return { newIntervals, newIsRunning };
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  intervals: number[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore++;
  } else {
    newOpponentScore++;
  }
  const newGoals = [...goals, { team, scorer: scorerName }];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(
  players: Player[],
  playerId: number | string,
  isAdding: boolean
): Player[] {
  if (isAdding) {
    const exists = players.find((p) => p.id === playerId);
    if (!exists) {
      return [...players, { id: playerId, name: "Player " + playerId, playTime: 0 }];
    }
    return players;
  } else {
    return players.filter((p) => p.id !== playerId);
  }
}

export function updatePlayerLists(
  players: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = players.filter((p) => {
    const pt = (p.playTime as number) || 0;
    return pt > 0;
  });
  const offField = players.filter((p) => {
    const pt = (p.playTime as number) || 0;
    return pt <= 0;
  });
  return { onField, offField };
}