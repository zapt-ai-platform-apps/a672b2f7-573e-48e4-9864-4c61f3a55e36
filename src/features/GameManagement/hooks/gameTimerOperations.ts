import { GameInterval } from './gameActionsHelpers';

/**
 * Calculates total elapsed time across all game intervals
 */
export function getTimeElapsed(gameIntervals: GameInterval[], isRunning: boolean): number {
  if (gameIntervals.length === 0) return 0;

  let totalTime = 0;
  const now = Date.now();

  // Add up all completed intervals
  for (let i = 0; i < gameIntervals.length - 1; i++) {
    const interval = gameIntervals[i];
    if (interval.startTime && interval.endTime) {
      totalTime += interval.endTime - interval.startTime;
    }
  }

  // Add time from current interval if game is running
  const currentInterval = gameIntervals[gameIntervals.length - 1];
  if (isRunning && currentInterval && currentInterval.startTime) {
    totalTime += now - currentInterval.startTime;
  } else if (currentInterval && currentInterval.startTime && currentInterval.endTime) {
    totalTime += currentInterval.endTime - currentInterval.startTime;
  }

  return Math.floor(totalTime / 1000); // Convert to seconds
}