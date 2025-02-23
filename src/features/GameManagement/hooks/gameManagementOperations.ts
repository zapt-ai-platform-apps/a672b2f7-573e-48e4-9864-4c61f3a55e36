import { Player } from '../../../types/GameTypes';

interface Interval {
  startTime: number;
  endTime: number | null;
}

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player.playIntervals || !Array.isArray(player.playIntervals)) return 0;
  const now = Date.now();
  return player.playIntervals.reduce((total, interval: Interval) => {
    const end = interval.endTime !== null ? interval.endTime : (isRunning ? now : now);
    return total + (end - interval.startTime);
  }, 0);
}

export function getTimeElapsed(gameIntervals: Interval[], isRunning: boolean): number {
  const now = Date.now();
  return gameIntervals.reduce((total, interval: Interval) => {
    const end = interval.endTime !== null ? interval.endTime : (isRunning ? now : now);
    return total + (end - interval.startTime);
  }, 0);
}

export function toggleTimer(isRunning: boolean, gameIntervals: Interval[]): { newIntervals: Interval[]; newIsRunning: boolean } {
  const now = Date.now();
  let newIntervals = [...gameIntervals];
  let newIsRunning: boolean;
  if (isRunning) {
    // Pause: update the last interval with an end time.
    newIntervals = newIntervals.map((interval, index) => {
      if (index === newIntervals.length - 1 && interval.endTime === null) {
        return { ...interval, endTime: now };
      }
      return interval;
    });
    newIsRunning = false;
  } else {
    // Start: add a new interval.
    newIntervals = [...newIntervals, { startTime: now, endTime: null }];
    newIsRunning = true;
  }
  return { newIntervals, newIsRunning };
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any,
  gameIntervals: Interval[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any } {
  const elapsed = getTimeElapsed(gameIntervals, isRunning);
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore += 1;
  } else {
    newOpponentScore += 1;
  }
  const newGoal = { team, scorerName, time: elapsed };
  const newGoals = Array.isArray(goals) ? [...goals, newGoal] : [newGoal];
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(playerData: Player[], playerId: number | string, isAdding: boolean): Player[] {
  return playerData.map(player => {
    if (player.id === playerId) {
      return { ...player, isOnField: isAdding };
    }
    return player;
  });
}

export function updatePlayerLists(playerData: Player[], includeGKPlaytime: boolean, isRunning: boolean): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}