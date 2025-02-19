import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { createPlayer } from '../../../shared/models/player';
import {
  getTotalPlayTimeValue as utilGetTotalPlayTimeValue,
  updateLists as utilUpdateLists,
  getTimeElapsedValue as utilGetTimeElapsedValue,
  toggleTimerHandler as utilToggleTimerHandler,
  recordGoalHandler as utilRecordGoalHandler,
  handlePlayerAdjustmentHandler as utilHandlePlayerAdjustmentHandler
} from '../utils/gameManagementHandlers';

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
    return utilGetTotalPlayTimeValue(player, includeGKPlaytime, isRunning);
  };

  const updatePlayerLists = () => {
    return utilUpdateLists(playerData, includeGKPlaytime, isRunning);
  };

  const getTimeElapsed = () => {
    return utilGetTimeElapsedValue(gameIntervals, isRunning);
  };

  const toggleTimer = () => {
    const { newIntervals, newIsRunning } = utilToggleTimerHandler(isRunning, gameIntervals);
    setGameIntervals(newIntervals);
    setIsRunning(newIsRunning);
  };

  const handleEndGame = () => setShowEndGameConfirm(true);
  const confirmEndGame = () => setShowEndGameConfirm(false);
  const cancelEndGame = () => setShowEndGameConfirm(false);

  const recordGoal = (team, scorerName) => {
    const { newOurScore, newOpponentScore, newGoals } = utilRecordGoalHandler(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
    setOurScore(newOurScore);
    setOpponentScore(newOpponentScore);
    setGoals(newGoals);
  };

  const handlePlayerAdjustment = (playerId, isAdding) => {
    setPlayerData(prev => utilHandlePlayerAdjustmentHandler(prev, playerId, isAdding));
  };

  useEffect(() => {
    if (currentSquad?.players) {
      const squadPlayers = currentSquad.players.map(name =>
        createPlayer({ name, isInMatchSquad: true, isInStartingLineup: true })
      );
      setPlayerData(prev => [
        ...prev.filter(p => p.isInMatchSquad),
        ...squadPlayers
      ]);
    }
  }, [currentSquad]);

  const playerLists = updatePlayerLists();

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
    showGoalModal,
    setShowGoalModal,
    recordGoal,
    handlePlayerAdjustment,
    updatePlayerLists: updatePlayerLists,
    onFieldPlayers: playerLists.onField,
    offFieldPlayers: playerLists.offField
  };
}

export default useGameManagementLogic;