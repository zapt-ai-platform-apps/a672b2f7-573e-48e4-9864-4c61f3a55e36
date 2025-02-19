export function getTotalPlayTimeFunc(player, includeGKPlaytime, isRunning, calculateTotalPlayTime) {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsedFunc(gameIntervals, isRunning, getTimeElapsed) {
  return getTimeElapsed(gameIntervals, isRunning);
}

export function toggleTimerHandler(isRunning, gameIntervals, setGameIntervals, setIsRunning, toggleTimer) {
  const { newIntervals, newIsRunning } = toggleTimer(isRunning, gameIntervals);
  setGameIntervals(newIntervals);
  setIsRunning(newIsRunning);
}

export function recordGoalFunc(team, scorerName, ourScore, opponentScore, goals, timeElapsed, recordGoal) {
  return recordGoal(team, scorerName, ourScore, opponentScore, goals, timeElapsed);
}

export function handlePlayerAdjustmentFunc(playerData, playerId, isAdding, handlePlayerAdjustment) {
  return handlePlayerAdjustment(playerData, playerId, isAdding);
}

export function updatePlayerListsFunc(playerData, includeGKPlaytime, isRunning, updatePlayerLists) {
  return updatePlayerLists(playerData, includeGKPlaytime, isRunning);
}