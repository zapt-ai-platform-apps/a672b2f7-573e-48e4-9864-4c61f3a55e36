export function getTotalPlayTime(player: any, includeGKPlaytime: boolean, isRunning: boolean): number {
  // Assume player has a playTime property in seconds.
  // Optionally adjust playTime if timer is running.
  const extra = isRunning ? 1 : 0;
  if (!includeGKPlaytime && player.position === 'GK') {
    return player.playTime;
  }
  return player.playTime + extra;
}

export function getTimeElapsed(gameIntervals: any[], isRunning: boolean): number {
  // If the timer is running, the last interval is expected to be a start timestamp.
  if (isRunning && gameIntervals.length > 0) {
    const startTime = gameIntervals[gameIntervals.length - 1];
    const completedIntervals = gameIntervals.slice(0, gameIntervals.length - 1);
    const totalCompleted = completedIntervals.reduce((sum: number, duration: number) => sum + duration, 0);
    return totalCompleted + (Date.now() - startTime);
  }
  return gameIntervals.reduce((sum: number, duration: number) => sum + duration, 0);
}

export function toggleTimer(isRunning: boolean, gameIntervals: any[]): { newIntervals: any[]; newIsRunning: boolean } {
  if (!isRunning) {
    // Starting the timer: add the current timestamp as the start of a new interval.
    return { newIntervals: [...gameIntervals, Date.now()], newIsRunning: true };
  } else {
    // Stopping the timer: calculate the duration of the current interval.
    const startTime = gameIntervals[gameIntervals.length - 1];
    const duration = Date.now() - startTime;
    const newIntervals = [...gameIntervals.slice(0, gameIntervals.length - 1), duration];
    return { newIntervals, newIsRunning: false };
  }
}

export function recordGoal(
  team: 'our' | 'opponent',
  scorerName: string,
  ourScore: number,
  opponentScore: number,
  goals: any[],
  gameIntervals: any[],
  isRunning: boolean
): { newOurScore: number; newOpponentScore: number; newGoals: any[] } {
  const timeElapsed = getTimeElapsed(gameIntervals, isRunning);
  const newGoal = { team, scorerName, time: timeElapsed };
  const newGoals = [...goals, newGoal];
  if (team === 'our') {
    return { newOurScore: ourScore + 1, newOpponentScore: opponentScore, newGoals };
  }
  return { newOurScore: ourScore, newOpponentScore: opponentScore + 1, newGoals };
}

export function handlePlayerAdjustment(prevPlayers: any[], playerId: number | string, isAdding: boolean): any[] {
  if (isAdding) {
    // Add a new player with default values. Ensure no duplicate by checking id.
    const exists = prevPlayers.some((player) => player.id === playerId);
    if (!exists) {
      return [...prevPlayers, { id: playerId, playTime: 0, position: 'field', active: true }];
    }
    return prevPlayers;
  } else {
    // Remove the player with the given id.
    return prevPlayers.filter((player) => player.id !== playerId);
  }
}

export function updatePlayerLists(playerData: any[], includeGKPlaytime: boolean, isRunning: boolean): { onField: any[]; offField: any[] } {
  // For this example, partition players based on an 'active' flag.
  const onField = playerData.filter((player) => player.active !== false);
  const offField = playerData.filter((player) => player.active === false);
  return { onField, offField };
}