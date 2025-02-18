import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { calculateElapsedTime, processPlayerLists } from '../../../shared/models/timeUtils';
import { createPlayer } from '../../../shared/models/player';
import { getTotalPlayTimeHelper, processPlayerPlayIntervals } from '../utils/gameManagementHelpers';

export function useGameManagementLogic() {
  const {
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    includeGKPlaytime,
    currentSquad
  } = useStateContext();

  const [isRunning, setIsRunning] = useState(false);
  const [gameIntervals, setGameIntervals] = useState([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const getTotalPlayTime = (player) => {
    return getTotalPlayTimeHelper(player, isRunning, includeGKPlaytime);
  };

  const updatePlayerLists = () => {
    const { onField, offField } = processPlayerLists(
      playerData.filter(p => p.isInMatchSquad),
      includeGKPlaytime,
      isRunning
    );
    return { onField, offField };
  };

  const getTimeElapsed = () => {
    return calculateElapsedTime(gameIntervals, isRunning);
  };

  const toggleTimer = () => {
    setIsRunning(prev => {
      const now = Date.now();
      if (!prev) {
        setGameIntervals(prevIntervals => [
          ...prevIntervals, 
          { startTime: now, endTime: null }
        ]);
        setPlayerData(prev => processPlayerPlayIntervals(prev, true, now));
      } else {
        setGameIntervals(prevIntervals =>
          prevIntervals.map((interval, idx) =>
            idx === prevIntervals.length - 1 ? { ...interval, endTime: now } : interval
          )
        );
        setPlayerData(prev => processPlayerPlayIntervals(prev, false, now));
      }
      return !prev;
    });
  };

  const handleEndGame = () => setShowEndGameConfirm(true);
  const confirmEndGame = () => setShowEndGameConfirm(false);
  const cancelEndGame = () => setShowEndGameConfirm(false);

  const recordGoalForPlayer = (playerName) => {
    const time = getTimeElapsed();
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
  };

  const handlePlayerAdjustment = (playerId, isAdding) => {
    setPlayerData(prev =>
      prev.map(player =>
        player.id === playerId ? { ...player, isOnField: isAdding } : player
      )
    );
  };

  useEffect(() => {
    if (currentSquad?.players) {
      const squadPlayers = currentSquad.players.map(name =>
        createPlayer({ name, isInMatchSquad: true })
      );
      setPlayerData(prev => [
        ...prev.filter(p => p.isInMatchSquad),
        ...squadPlayers
      ]);
    }
  }, [currentSquad]);

  return {
    playerData,
    setPlayerData,
    isRunning,
    ourScore,
    opponentScore,
    getTotalPlayTime,
    getTimeElapsed,
    toggleTimer,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    showEndGameConfirm,
    recordGoalForPlayer,
    handlePlayerAdjustment,
    updatePlayerLists: () => updatePlayerLists(),
    onFieldPlayers: updatePlayerLists().onField,
    offFieldPlayers: updatePlayerLists().offField
  };
}