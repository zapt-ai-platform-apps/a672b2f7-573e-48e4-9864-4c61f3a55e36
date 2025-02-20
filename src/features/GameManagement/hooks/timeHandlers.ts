import { calculateTotalPlayTime, calculateElapsedTime } from '../../../shared/models/playerUtils';
import { Dispatch, SetStateAction } from 'react';

export function getTotalPlayTime(player: any, includeGKPlaytime: boolean, isRunning: boolean): number {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsed(
  gameIntervals: { startTime: number; endTime: number | null }[],
  isRunning: boolean
): number {
  return calculateElapsedTime(gameIntervals, isRunning);
}

export function toggleTimer(
  setIsRunning: Dispatch<SetStateAction<boolean>>,
  gameIntervals: { startTime: number; endTime: number | null }[],
  setGameIntervals: Dispatch<SetStateAction<{ startTime: number; endTime: number | null }[]>>
): void {
  setIsRunning(prev => {
    if (!prev) {
      setGameIntervals([...gameIntervals, { startTime: Date.now(), endTime: null }]);
    } else {
      const lastInterval = gameIntervals[gameIntervals.length - 1];
      if (lastInterval && !lastInterval.endTime) {
        const updatedIntervals = [...gameIntervals];
        updatedIntervals[updatedIntervals.length - 1].endTime = Date.now();
        setGameIntervals(updatedIntervals);
      }
    }
    return !prev;
  });
}

export function recordGoalForPlayer(
  playerId: string | number,
  gameIntervals: { startTime: number; endTime: number | null }[],
  isRunning: boolean,
  setGoals: Dispatch<SetStateAction<any[]>>,
  setOurScore: Dispatch<SetStateAction<number>>
): void {
  const time = calculateElapsedTime(gameIntervals, isRunning);
  setOurScore(prev => prev + 1);
  setGoals(prevGoals => [
    ...prevGoals,
    {
      team: 'our',
      scorerId: playerId,
      time,
      timestamp: Date.now()
    }
  ]);
}