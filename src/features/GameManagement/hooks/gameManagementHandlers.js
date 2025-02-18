import { calculateTotalPlayTime, processPlayerLists, calculateElapsedTime } from '../../shared/models/playerUtils.js';

export function getTotalPlayTime(player, includeGKPlaytime, isRunning) {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function updatePlayerLists(playerData, includeGKPlaytime, isRunning) {
  const { onField, offField } = processPlayerLists(playerData, includeGKPlaytime, isRunning);
  return { onField, offField };
}

export function getTimeElapsed(gameIntervals, isRunning) {
  return calculateElapsedTime(gameIntervals, isRunning);
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

export function toggleTimer(setIsRunning) {
  setIsRunning(prev => !prev);
}

export function assignGoalkeeper(goalkeeper, playerData, setGoalkeeper) {
  if (!goalkeeper && playerData.length > 0) {
    setGoalkeeper(playerData[0].name);
  }
}

export function handleRemoveLastGoal(setGoals) {
  setGoals(prevGoals => prevGoals.slice(0, -1));
}

export function handleIncreasePlayers(setOnFieldPlayers) {
  setOnFieldPlayers(prev => [
    ...prev,
    { id: Date.now(), name: 'New Player', playIntervals: [] }
  ]);
}

export function handleDecreasePlayers(setOnFieldPlayers) {
  setOnFieldPlayers(prev => prev.slice(0, -1));
}

export function recordGoalForPlayer(playerName, gameIntervals, isRunning, setOurScore, setGoals) {
  const time = calculateElapsedTime(gameIntervals, isRunning);
  setOurScore(prev => prev + 1);
  setGoals(prevGoals => [
    ...prevGoals,
    { team: 'our', scorerName: playerName, time }
  ]);
}