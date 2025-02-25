import type { Player } from "../types/GameTypes";

/**
 * Handles the business logic for changing the goalkeeper.
 */
export function changeGoalkeeper(
  playerData: Player[],
  newGoalkeeper: Player,
  previousGoalkeeper: Player | null,
  isRunning: boolean
): Player[] {
  const now = Date.now();
  return playerData.map(player => {
    // Handle previous goalkeeper
    if (previousGoalkeeper && player.id === previousGoalkeeper.id) {
      const updatedIntervals = player.playIntervals?.map(interval => {
        if (interval.endTime === null) {
          return { ...interval, endTime: now };
        }
        return interval;
      }) || [];
      return {
        ...player,
        isGoalkeeper: false,
        playIntervals: updatedIntervals
      };
    }

    // Handle new goalkeeper
    if (player.id === newGoalkeeper.id) {
      const newInterval = {
        start: now,
        end: isRunning ? undefined : now,
        startTime: now,
        endTime: isRunning ? null : now,
        isGoalkeeper: true
      };
      
      return {
        ...player,
        isGoalkeeper: true,
        playIntervals: [
          ...(player.playIntervals || []),
          newInterval
        ]
      };
    }

    return player;
  });
}