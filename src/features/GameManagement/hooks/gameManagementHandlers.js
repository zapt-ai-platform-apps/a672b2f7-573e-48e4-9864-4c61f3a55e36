export function getTotalPlayTime(player, includeGKPlaytime, isRunning) {
  let playTime = player.playTime || 0;
  if (includeGKPlaytime && player.isGoalie) {
    playTime += 5;
  }
  return playTime;
}

export function updatePlayerLists(players, includeGKPlaytime, isRunning) {
  const onField = players.filter(p => p.isInMatchSquad);
  const offField = players.filter(p => !p.isInMatchSquad);
  return { onField, offField };
}

export function getTimeElapsed(gameIntervals, isRunning) {
  let total = 0;
  gameIntervals.forEach(interval => {
    if (interval.end && interval.start) {
      total += (interval.end - interval.start);
    }
  });
  return total;
}

export function handleEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(true);
}

export function confirmEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(false);
}

export function cancelEndGame(setShowEndGameConfirm) {
  setShowEndGameConfirm(false);
}

export function toggleTimer(setIsRunning, gameIntervals, setGameIntervals) {
  setIsRunning(prevIsRunning => {
    if (!prevIsRunning) {
      setGameIntervals(prevIntervals => [...prevIntervals, { start: Date.now(), end: 0 }]);
      return true;
    } else {
      setGameIntervals(prevIntervals => {
        const updatedIntervals = [...prevIntervals];
        if (updatedIntervals.length > 0 && updatedIntervals[updatedIntervals.length - 1].end === 0) {
          updatedIntervals[updatedIntervals.length - 1] = {
            ...updatedIntervals[updatedIntervals.length - 1],
            end: Date.now()
          };
        }
        return updatedIntervals;
      });
      return false;
    }
  });
}

export function assignGoalkeeper(goalkeeper, playerData, setGoalkeeper) {
  if (!goalkeeper && playerData.length > 0) {
    setGoalkeeper(playerData[0]);
  }
}

export function handleRemoveLastGoal(setGoals, setOurScore) {
  setGoals(prevGoals => {
    const newGoals = [...prevGoals];
    newGoals.pop();
    return newGoals;
  });
  setOurScore(prevScore => Math.max(prevScore - 1, 0));
}

export function handlePlayerAdjustment(playerId, setPlayerData, isAdding) {
  setPlayerData(prevData => prevData.map(player => {
    if (player.id === playerId) {
      return { ...player, adjusted: isAdding };
    }
    return player;
  }));
}

export function recordGoalForPlayer(playerId, gameIntervals, isRunning, setGoals, setOurScore) {
  const time = getTimeElapsed(gameIntervals, isRunning);
  setGoals(prevGoals => [...prevGoals, { playerId, time }]);
  setOurScore(prevScore => prevScore + 1);
}