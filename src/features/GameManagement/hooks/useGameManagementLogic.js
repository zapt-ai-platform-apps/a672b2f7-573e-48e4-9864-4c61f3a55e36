import { useState } from 'react';
import { useStateContext } from '../../../state';
import { getTimeElapsed, toggleTimer, recordGoal, handlePlayerAdjustment, updatePlayerLists } from '../../../shared/models/gameModel';
import { calculateTotalPlayTime } from '../../../shared/models/timeUtils';
import useSquadSetup from './useSquadSetup';
import {
  getTotalPlayTimeFunc as getTotalPlayTimeFuncUtil,
  getTimeElapsedFunc as getTimeElapsedFuncUtil,
  toggleTimerHandler as toggleTimerHandlerUtil,
  recordGoalFunc as recordGoalFuncUtil,
  handlePlayerAdjustmentFunc as handlePlayerAdjustmentFuncUtil,
  updatePlayerListsFunc as updatePlayerListsFuncUtil
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

  useSquadSetup(currentSquad, setPlayerData);

  const getTotalPlayTimeFunc = (player) => {
    return getTotalPlayTimeFuncUtil(player, includeGKPlaytime, isRunning, calculateTotalPlayTime);
  };

  const getTimeElapsedFunc = () => {
    return getTimeElapsedFuncUtil(gameIntervals, isRunning, getTimeElapsed);
  };

  const toggleTimerHandler = () => {
    toggleTimerHandlerUtil(isRunning, gameIntervals, setGameIntervals, setIsRunning, toggleTimer);
  };

  const recordGoalFunc = (team, scorerName) => {
    const timeElapsed = getTimeElapsedFuncUtil(gameIntervals, isRunning, getTimeElapsed);
    const result = recordGoalFuncUtil(team, scorerName, ourScore, opponentScore, goals, timeElapsed, recordGoal);
    setOurScore(result.newOurScore);
    setOpponentScore(result.newOpponentScore);
    setGoals(result.newGoals);
  };

  const handlePlayerAdjustmentFunc = (playerId, isAdding) => {
    setPlayerData(prev => handlePlayerAdjustmentFuncUtil(prev, playerId, isAdding, handlePlayerAdjustment));
  };

  const updatePlayerListsFunc = () => {
    return updatePlayerListsFuncUtil(playerData, includeGKPlaytime, isRunning, updatePlayerLists);
  };

  return {
    playerData,
    setPlayerData,
    isRunning,
    ourScore,
    opponentScore,
    getTotalPlayTime: getTotalPlayTimeFunc,
    getTimeElapsed: getTimeElapsedFunc,
    toggleTimer: toggleTimerHandler,
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
    setShowAddPlayerModal
  };
}

export default useGameManagementLogic;