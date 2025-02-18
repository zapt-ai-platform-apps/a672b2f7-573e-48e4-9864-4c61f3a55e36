export function getTotalPlayTimeHelper(player, isRunning, includeGKPlaytime) {
  let total = 0;
  player.playIntervals.forEach(interval => {
    if (!includeGKPlaytime && interval.isGoalkeeper) return;
    const end = interval.endTime || (isRunning ? Date.now() : 0);
    total += end - interval.startTime;
  });
  return Math.floor(total / 1000);
}

export function processPlayerPlayIntervals(players, isStarting, now) {
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
          playIntervals: player.playIntervals.map((interval, idx) =>
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