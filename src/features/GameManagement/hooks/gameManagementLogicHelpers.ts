import type { GameInterval } from "./gameActionsHelpers";
import { Player } from "../../../types/GameTypes";

export function getTotalPlayTime(player: Player | undefined, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player) {
    console.error('getTotalPlayTime: player is undefined');
    return 0;
  }
  return player.totalPlayTime ?? 0;
}

export function getTimeElapsed(gameIntervals: GameInterval[], isRunning: boolean): number {
  const secondsArray = gameIntervals.map(interval => {
    if (interval.endTime === null) {
      return Math.floor((Date.now() - interval.startTime) / 1000);
    }
    return Math.floor((interval.endTime - interval.startTime) / 1000);
  });
  
  return secondsArray.reduce((sum, seconds) => sum + seconds, 0);
}

export function toggleTimer(
  isRunning: boolean,
  gameIntervals: GameInterval[]
): { newIntervals: GameInterval[]; newIsRunning: boolean } {
  const newIntervals = [...gameIntervals];
  
  if (!isRunning) {
    // Start the timer
    newIntervals.push({ startTime: Date.now(), endTime: null });
    return { newIntervals, newIsRunning: true };
  } else {
    // Stop the timer
    const lastInterval = newIntervals[newIntervals.length - 1];
    if (lastInterval && lastInterval.endTime === null) {
      lastInterval.endTime = Date.now();
    }
    return { newIntervals, newIsRunning: false };
  }
}

export function updatePlayerLists(
  playerData: Player[],
  includeGKPlaytime: boolean,
  isRunning: boolean
): { onField: Player[]; offField: Player[] } {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}