import { Player } from '../../../types/GameTypes';

interface Interval {
  startTime: number;
  endTime: number | null;
}

export function getTotalPlayTime(player: Player, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player || !player.playIntervals || !Array.isArray(player.playIntervals)) return 0;
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
    newIntervals = newIntervals.map((interval, index) => {
      if (index === newIntervals.length - 1 && interval.endTime === null) {
        return { ...interval, endTime: now };
      }
      return interval;
    });
    newIsRunning = false;
  } else {
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
  const newGoalsResult = Array.isArray(goals) ? [...goals, newGoal] : [newGoal];
  return { newOurScore, newOpponentScore, newGoals: newGoalsResult };
}