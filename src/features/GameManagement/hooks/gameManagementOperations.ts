import { Player } from '../../../types/GameTypes';

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  let total = 0;
  if (player.playIntervals && Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      if (interval.endTime !== null) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        total += Date.now() - interval.startTime;
      }
    }
  }
  return total;
}

export function getTimeElapsed(
  intervals: { startTime: number; endTime: number | null }[],
  isRunning: boolean
): number {
  let total = 0;
  for (const interval of intervals) {
    if (interval.endTime !== null) {
      total += interval.endTime - interval.startTime;
    } else if (isRunning) {
      total += Date.now() - interval.startTime;
    }
  }
  return total;
}

export function toggleTimer(
  isRunning: boolean,
  intervals: { startTime: number; endTime: number | null }[]
): { newIntervals: { startTime: number; endTime: number | null }[]; newIsRunning: boolean } {
  if (isRunning) {
    const newIntervals = [...intervals];
    if (newIntervals.length > 0 && newIntervals[newIntervals.length - 1].endTime === null) {
      newIntervals[newIntervals.length - 1] = {
        ...newIntervals[newIntervals.length - 1],
        endTime: Date.now()
      };
    }
    return { newIntervals, newIsRunning: false };
  } else {
    const newIntervals = [...intervals, { startTime: Date.now(), endTime: null }];
    return { newIntervals, newIsRunning: true };
  }
}

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