import { calculateElapsedTime } from '../../../shared/models/timeUtils';
import { processPlayerLists } from '../../../shared/models/playerUtils';
import { getTotalPlayTimeHelper, processPlayerPlayIntervals } from './gameManagementHelpers';

export function getTotalPlayTimeWrapper(player, isRunning, includeGKPlaytime) {
  return getTotalPlayTimeHelper(player, isRunning, includeGKPlaytime);
}

export function updatePlayerListsLogic(playerData, includeGKPlaytime, isRunning) {
  const filteredPlayers = playerData.filter(p => p.isInMatchSquad);
  return processPlayerLists(filteredPlayers, includeGKPlaytime, isRunning);
}

export function getTimeElapsedWrapper(gameIntervals, isRunning) {
  return calculateElapsedTime(gameIntervals, isRunning);
}

export function toggleTimerLogic(prev, setGameIntervals, setPlayerData) {
  const now = Date.now();
  if (!prev) {
    setGameIntervals(prevIntervals => [
      ...prevIntervals,
      { startTime: now, endTime: null }
    ]);
    setPlayerData(prevPlayers => processPlayerPlayIntervals(prevPlayers, true, now));
  } else {
    setGameIntervals(prevIntervals =>
      prevIntervals.map((interval, idx) =>
        idx === prevIntervals.length - 1 ? { ...interval, endTime: now } : interval
      )
    );
    setPlayerData(prevPlayers => processPlayerPlayIntervals(prevPlayers, false, now));
  }
  return !prev;
}

export function recordGoalForPlayerLogic(playerName, getTimeElapsedCallback, setOurScore, setGoals) {
  const time = getTimeElapsedCallback();
  setOurScore(prev => prev + 1);
  setGoals(prev => [
    ...prev,
    {
      team: 'our',
      scorerName: playerName,
      time,
      timestamp: Date.now()
    }
  ]);
}

export function handlePlayerAdjustmentLogic(playerData, playerId, isAdding) {
  return playerData.map(player =>
    player.id === playerId ? { ...player, isOnField: isAdding } : player
  );
}