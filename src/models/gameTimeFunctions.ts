import { Player } from '../types/GameTypes';

export function getTotalPlayTime(
  player: Player,
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  const baseTime = (player.playTime as number) || 0;
  if (!includeGKPlaytime && player.isGoalkeeper) {
    return baseTime;
  }
  return player.totalPlayTime !== undefined 
    ? player.totalPlayTime + (isRunning && player.isOnField ? 1 : 0)
    : baseTime + (isRunning ? 1 : 0);
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