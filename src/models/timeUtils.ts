interface Interval {
  startTime: number;
  endTime: number | null;
}

/**
 * Calculates the total play time of a player.
 * @param player - The player object.
 * @param includeGKPlaytime - Whether to include goalkeeper playtime.
 * @param isRunning - Indicates if the game is running.
 * @returns Total play time in seconds.
 */
export function calculateTotalPlayTime(
  player: { playIntervals?: Interval[]; position?: string },
  includeGKPlaytime: boolean,
  isRunning: boolean
): number {
  let total = 0;
  if (player.playIntervals && Array.isArray(player.playIntervals)) {
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else if (isRunning) {
        total += Date.now() - interval.startTime;
      }
    }
  }
  if (player.position === 'Goalkeeper' && !includeGKPlaytime) {
    return 0;
  }
  return Math.floor(total / 1000);
}

/**
 * Formats time in seconds to a MM:SS string.
 * @param timeInSeconds - Time in seconds.
 * @returns Formatted time as MM:SS.
 */
export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
  return `${minutes}:${seconds}`;
}

/**
 * Calculates the elapsed time during the game.
 * @param gameIntervals - Array of game intervals.
 * @param isRunning - Indicates if the game is running.
 * @returns Elapsed time in seconds.
 */
export function calculateElapsedTime(gameIntervals: Interval[], isRunning: boolean): number {
  let total = 0;
  gameIntervals.forEach(interval => {
    if (interval.endTime) {
      total += interval.endTime - interval.startTime;
    } else if (isRunning) {
      total += Date.now() - interval.startTime;
    }
  });
  return Math.floor(total / 1000);
}

/**
 * Calculates the minimum play time among players.
 * @param players - Array of players with totalPlayTime property.
 * @returns Minimum play time in seconds.
 */
export function calculateMinPlayTime(players: { totalPlayTime?: number }[]): number {
  if (!players || players.length === 0) return 0;
  return Math.min(...players.map(p => p.totalPlayTime || 0));
}