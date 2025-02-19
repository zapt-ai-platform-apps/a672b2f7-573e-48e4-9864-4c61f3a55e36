export function getTotalPlayTime(player, includeGKPlaytime, isRunning) {
  // Returns the total play time for a player.
  // This example assumes player has a totalPlayTime property.
  return player.totalPlayTime || 0;
}

export function getTimeElapsed(gameIntervals, isRunning) {
  // Calculates the total time elapsed based on gameIntervals.
  let total = 0;
  const now = Date.now();
  gameIntervals.forEach(interval => {
    if (interval.end) {
      total += interval.end - interval.start;
    } else {
      total += now - interval.start;
    }
  });
  return total;
}

export function toggleTimer(isRunning, gameIntervals) {
  const now = Date.now();
  let newIntervals = [...gameIntervals];
  let newIsRunning = !isRunning;
  if (isRunning) {
    // Stopping the timer: update the last interval with an end time.
    if (newIntervals.length > 0 && !newIntervals[newIntervals.length - 1].end) {
      newIntervals[newIntervals.length - 1] = { ...newIntervals[newIntervals.length - 1], end: now };
    }
  } else {
    // Starting the timer: add a new interval.
    newIntervals.push({ start: now });
  }
  return { newIntervals, newIsRunning };
}

export function recordGoal(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning) {
  const timeElapsed = getTimeElapsed(gameIntervals, isRunning);
  const newGoals = [...goals, { team, scorerName, time: timeElapsed }];
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  if (team === 'our') {
    newOurScore = ourScore + 1;
  } else if (team === 'opponent') {
    newOpponentScore = opponentScore + 1;
  }
  return { newOurScore, newOpponentScore, newGoals };
}

export function handlePlayerAdjustment(prevPlayerData, playerId, isAdding) {
  // Adjusts the player status based on isAdding.
  // Assuming playerData is an array of player objects with an id and onField property.
  return prevPlayerData.map(player => {
    if (player.id === playerId) {
      return { ...player, onField: isAdding };
    }
    return player;
  });
}

export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  // Generates two lists: players on the field and players off the field.
  const onField = playerData.filter(player => player.onField);
  const offField = playerData.filter(player => !player.onField);
  return { onField, offField };
}