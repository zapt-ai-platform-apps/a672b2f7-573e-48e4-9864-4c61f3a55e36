export function getTotalPlayTimeWrapper(player, isRunning, includeGKPlaytime) {
  if (player.position === 'goalkeeper' && !includeGKPlaytime) {
    return 0;
  }
  return player.playTime || 0;
}

export function updatePlayerListsLogic(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(p => p.isInMatchSquad);
  const offField = playerData.filter(p => !p.isInMatchSquad);
  return { onField, offField };
}

export function getTimeElapsedWrapper(gameIntervals, isRunning) {
  let total = 0;
  for (const interval of gameIntervals) {
    if (interval.end) {
      total += interval.end - interval.start;
    } else {
      total += 0;
    }
  }
  if (isRunning) {
    const lastInterval = gameIntervals[gameIntervals.length - 1];
    if (lastInterval && !lastInterval.end) {
      total += Date.now() - lastInterval.start;
    }
  }
  return total;
}

export function toggleTimerLogic(isRunning, setGameIntervals, setPlayerData) {
  if (!isRunning) {
    setGameIntervals(prev => [...prev, { start: Date.now() }]);
    return true;
  } else {
    setGameIntervals(prev => {
      const newIntervals = [...prev];
      const lastInterval = newIntervals[newIntervals.length - 1];
      if (lastInterval && !lastInterval.end) {
        lastInterval.end = Date.now();
      }
      return newIntervals;
    });
    return false;
  }
}

export function recordGoalForPlayerLogic(goal, playerData, setPlayerData) {
  // Placeholder for extended logic; returns playerData unchanged for now.
  return playerData;
}

export function handlePlayerAdjustmentLogic(playerData, playerId, isAdding) {
  if (isAdding) {
    return playerData.map(player => {
      if (player.id === playerId) {
        return { ...player, playTime: (player.playTime || 0) + 1 };
      }
      return player;
    });
  } else {
    return playerData.map(player => {
      if (player.id === playerId) {
        return { ...player, playTime: Math.max((player.playTime || 0) - 1, 0) };
      }
      return player;
    });
  }
}