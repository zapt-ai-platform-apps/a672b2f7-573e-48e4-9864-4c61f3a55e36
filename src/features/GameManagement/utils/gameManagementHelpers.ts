export function getTotalPlayTimeHelper(
  player: any,
  isRunning: boolean,
  includeGKPlaytime: boolean
): number {
  let total = 0;
  player.playIntervals.forEach((interval: { startTime: number; endTime?: number | null; isGoalkeeper: boolean }) => {
    if (!includeGKPlaytime && interval.isGoalkeeper) return;
    const end = interval.endTime !== null && interval.endTime !== undefined ? interval.endTime : (isRunning ? Date.now() : 0);
    total += end - interval.startTime;
  });
  return Math.floor(total / 1000);
}

export function processPlayerPlayIntervals(
  players: any[],
  isStarting: boolean,
  now: number
): any[] {
  return players.map(player => {
    if (player.isOnField) {
      const lastInterval = player.playIntervals[player.playIntervals.length - 1];
      if (isStarting && (!lastInterval || lastInterval.endTime)) {
        return {
          ...player,
          playIntervals: [
            ...player.playIntervals, 
            { startTime: now, endTime: null, isGoalkeeper: player.isGoalkeeper }
          ]
        };
      }
      if (!isStarting && lastInterval && !lastInterval.endTime) {
        return {
          ...player,
          playIntervals: player.playIntervals.map((interval: any, idx: number) =>
            idx === player.playIntervals.length - 1
              ? { ...interval, endTime: now }
              : interval
          )
        };
      }
    }
    return player;
  });
}