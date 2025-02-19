import { useState } from 'react';
import { useStateContext } from '../../../state';
import {
  getTotalPlayTime,
  getTimeElapsedHandler,
  toggleTimerHandler,
  recordGoalHandler,
  handlePlayerAdjustmentHandler,
  updatePlayerListsHandler
} from './gameManagementLogicHelpers';

function useGameManagementLogic() {
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
    currentSquad,
    handleStartGame: contextHandleStartGame,
    resetGame
  } = useStateContext();

  const [isRunning, setIsRunning] = useState(false);
  const [gameIntervals, setGameIntervals] = useState([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const getTotalPlayTimeFunc = (player) => {
    return getTotalPlayTime(player, includeGKPlaytime, isRunning);
  };

  const getTimeElapsedFunc = () => {
    return getTimeElapsedHandler(gameIntervals, isRunning);
  };

  const toggleTimerFunc = () => {
    const { newIntervals, newIsRunning } = toggleTimerHandler(isRunning, gameIntervals);
    setGameIntervals(newIntervals);
    setIsRunning(newIsRunning);
  };

  const recordGoalFunc = (team, scorerName) => {
    const result = recordGoalHandler(team, scorerName, ourScore, opponentScore, goals, gameIntervals, isRunning);
    setOurScore(result.newOurScore);
    setOpponentScore(result.newOpponentScore);
    setGoals(result.newGoals);
  };

  const handlePlayerAdjustmentFunc = (playerId, isAdding) => {
    setPlayerData(prev => handlePlayerAdjustmentHandler(prev, playerId, isAdding));
  };

  const updatePlayerListsFunc = () => {
    return updatePlayerListsHandler(playerData, includeGKPlaytime, isRunning);
  };

  return {
    playerData,
    setPlayerData,
    isRunning,
    ourScore,
    opponentScore,
    getTotalPlayTime: getTotalPlayTimeFunc,
    getTimeElapsed: getTimeElapsedFunc,
    toggleTimer: toggleTimerFunc,
    handleEndGame: () => setShowEndGameConfirm(true),
    confirmEndGame: () => setShowEndGameConfirm(false),
    cancelEndGame: () => setShowEndGameConfirm(false),
    showEndGameConfirm,
    showGoalModal,
    setShowGoalModal,
    recordGoal: recordGoalFunc,
    handlePlayerAdjustment: handlePlayerAdjustmentFunc,
    updatePlayerLists: updatePlayerListsFunc,
    onFieldPlayers: updatePlayerListsFunc().onField,
    offFieldPlayers: updatePlayerListsFunc().offField,
    showAddPlayerModal,
    setShowAddPlayerModal,
    resetGame
  };
}

export default useGameManagementLogic;