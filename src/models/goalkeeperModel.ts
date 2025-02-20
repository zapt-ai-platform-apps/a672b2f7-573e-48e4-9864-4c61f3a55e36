import type { Player } from "../types/GameTypes";

/**
 * Handles the business logic for changing the goalkeeper.
 *
 * @param playerData - Array of player objects.
 * @param newGoalkeeperName - The name of the new goalkeeper.
 * @param previousGoalkeeperName - The name of the previous goalkeeper.
 * @param isRunning - Indicates if the game is currently running.
 * @returns Updated array of player objects after the goalkeeper change.
 */
export function changeGoalkeeper(
  playerData: Player[],
  newGoalkeeperName: string,
  previousGoalkeeperName: string,
  isRunning: boolean
): Player[] {
  const now = Date.now();
  return playerData.map((player) => {
    if (player.name === newGoalkeeperName) {
      if (isRunning && player.isOnField) {
        if (player.playIntervals && player.playIntervals.length > 0 && player.playIntervals[player.playIntervals.length - 1].endTime === null) {
          player.playIntervals[player.playIntervals.length - 1].endTime = now;
        }
        if (player.playIntervals) {
          player.playIntervals.push({ startTime: now, endTime: null, isGoalkeeper: true });
        }
      }
      return { ...player, isGoalkeeper: true };
    } else if (player.name === previousGoalkeeperName) {
      if (isRunning && player.isOnField) {
        if (player.playIntervals && player.playIntervals.length > 0 && player.playIntervals[player.playIntervals.length - 1].endTime === null) {
          player.playIntervals[player.playIntervals.length - 1].endTime = now;
        }
        if (player.playIntervals) {
          player.playIntervals.push({ startTime: now, endTime: null, isGoalkeeper: false });
        }
      }
      return { ...player, isGoalkeeper: false };
    } else {
      return player;
    }
  });
}