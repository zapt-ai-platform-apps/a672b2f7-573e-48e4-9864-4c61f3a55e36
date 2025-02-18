import { calculateTotalPlayTime, calculateElapsedTime } from '../../../shared/models/playerUtils.js';

export function getTotalPlayTime(player, includeGKPlaytime, isRunning) {
  return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
}

export function getTimeElapsed(gameIntervals, isRunning) {
  return calculateElapsedTime(gameIntervals, isRunning);
}

export function toggleTimer(setIsRunning, gameIntervals, setGameIntervals) {
  setIsRunning(prev => {
    if (!prev) {
      setGameIntervals([...gameIntervals, { start: Date.now(), end: null }]);
    } else {
      const lastInterval = gameIntervals[gameIntervals.length - 1];
      if (lastInterval && !lastInterval.end) {
        const updatedIntervals = [...gameIntervals];
        updatedIntervals[updatedIntervals.length - 1].end = Date.now();
        setGameIntervals(updatedIntervals);
      }
    }
    return !prev;
  });
}

export function recordGoalForPlayer(playerId, gameIntervals, isRunning, setGoals, setOurScore) {
  const time = calculateElapsedTime(gameIntervals, isRunning);
  setOurScore(prev => prev + 1);
  setGoals(prevGoals => [
    ...prevGoals,
    { 
      team: 'our',
      scorerId: playerId,
      time,
      timestamp: Date.now()
    }
  ]);
}