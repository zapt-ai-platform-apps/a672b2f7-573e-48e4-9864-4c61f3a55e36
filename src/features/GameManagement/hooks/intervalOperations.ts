import { calculateTotalPlayTime, getTimeElapsed as getElapsedTime, toggleTimer as toggleTimerState } from '../../../shared/models/timeUtils';
import type { Player } from '../../../types/GameTypes';

/**
 * Calculates the total play time for a player
 */
export const getTotalPlayTime = (player: Player, includeGKPlaytime: boolean, isRunning: boolean): number => {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
};

/**
 * Gets the elapsed time from game intervals
 */
export const getTimeElapsed = (gameIntervals: any[], isRunning: boolean): number => {
  return getElapsedTime(gameIntervals, isRunning);
};

/**
 * Toggles the timer state
 */
export const toggleTimer = (isRunning: boolean, gameIntervals: any[]): any => {
  return toggleTimerState(isRunning, gameIntervals);
};