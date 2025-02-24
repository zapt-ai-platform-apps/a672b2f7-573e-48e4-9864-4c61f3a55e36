interface Interval {
  start: number;
  end?: number;
}

import { Player } from '../../../types/GameTypes';

function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  let total = 0;
  const intervals: Interval[] = player.playIntervals || [];
  intervals.forEach(interval => {
    if (interval.end) {
      total += (interval.end - interval.start);
    } else if (isRunning) {
      total += (Date.now() - interval.start);
    }
  });
  return Math.floor(total / 1000);
}

function getTimeElapsed(gameIntervals: Interval[], isRunning: boolean): number {
  let total = 0;
  gameIntervals.forEach(interval => {
    if (interval.end) {
      total += (interval.end - interval.start);
    } else if (isRunning) {
      total += (Date.now() - interval.start);
    }
  });
  return Math.floor(total / 1000);
}

function toggleTimer(isRunning: boolean, gameIntervals: Interval[]): { newIntervals: Interval[]; newIsRunning: boolean } {
  const newIntervals = [...gameIntervals];
  if (!isRunning) {
    newIntervals.push({ start: Date.now() });
    return { newIntervals, newIsRunning: true };
  } else {
    const lastInterval = newIntervals[newIntervals.length - 1];
    if (lastInterval && !lastInterval.end) {
      lastInterval.end = Date.now();
    }
    return { newIntervals, newIsRunning: false };
  }
}

function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: Interval[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  const elapsed = getTimeElapsed(gameIntervals, isRunning);
  const newGoal = { team, scorer: scorerName, time: elapsed };
  const newGoals = [...goals, newGoal];
  const newOurScore = team === 'our' ? ourScore + 1 : ourScore;
  const newOpponentScore = team === 'opponent' ? opponentScore + 1 : opponentScore;
  return { newOurScore, newOpponentScore, newGoals };
}

function handlePlayerAdjustment(playerData: any[], playerId: number | string, isAdding: boolean): any[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

interface PlayerLists {
  onField: any[];
  offField: any[];
}

function updatePlayerLists(playerData: any[], includeGKPlaytime: boolean, isRunning: boolean): PlayerLists {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}

export {
  getTotalPlayTime,
  getTimeElapsed,
  toggleTimer,
  recordGoal,
  handlePlayerAdjustment,
  updatePlayerLists
};