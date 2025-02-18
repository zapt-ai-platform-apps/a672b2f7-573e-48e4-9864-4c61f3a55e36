import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { 
  getTotalPlayTime as getTotalPlayTimeHandler,
  updatePlayerLists as updatePlayerListsHandler,
  getTimeElapsed as getTimeElapsedHandler,
  handleEndGame as handleEndGameHandler,
  confirmEndGame as confirmEndGameHandler,
  cancelEndGame as cancelEndGameHandler,
  toggleTimer as toggleTimerHandler,
  assignGoalkeeper as assignGoalkeeperHandler,
  handleRemoveLastGoal as handleRemoveLastGoalHandler,
  handlePlayerAdjustment as handlePlayerAdjustmentHandler,
  recordGoalForPlayer as recordGoalForPlayerHandler
} from './gameManagementHandlers.js';

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
  const [onFieldPlayers, setOnFieldPlayers] = useState([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const getTotalPlayTime = (player) => {
    return getTotalPlayTimeHandler(player, includeGKPlaytime, isRunning);
  };

  const updatePlayerLists = () => {
    const squadPlayers = currentSquad?.players || [];
    const { onField, offField } = updatePlayerListsHandler(
      [...playerData, ...squadPlayers],
      includeGKPlaytime,
      isRunning
    );
    setOnFieldPlayers(onField);
    setOffFieldPlayers(offField);
  };

  const getTimeElapsed = () => {
    return getTimeElapsedHandler(gameIntervals, isRunning);
  };

  const handleEndGame = () => {
    handleEndGameHandler(setShowEndGameConfirm);
  };

  const confirmEndGame = () => {
    confirmEndGameHandler(setShowEndGameConfirm);
  };

  const cancelEndGame = () => {
    cancelEndGameHandler(setShowEndGameConfirm);
  };

  const toggleTimer = () => {
    toggleTimerHandler(setIsRunning, gameIntervals, setGameIntervals);
  };

  const assignGoalkeeper = () => {
    assignGoalkeeperHandler(goalkeeper, playerData, setGoalkeeper);
  };

  const handleRemoveLastGoal = () => {
    handleRemoveLastGoalHandler(setGoals, setOurScore);
  };

  const handlePlayerAdjustment = (playerId, isAdding) => {
    handlePlayerAdjustmentHandler(playerId, setPlayerData, isAdding);
  };

  const recordGoalForPlayer = (playerId) => {
    recordGoalForPlayerHandler(
      playerId,
      gameIntervals,
      isRunning,
      setGoals,
      setOurScore
    );
  };

  useEffect(() => {
    updatePlayerLists();
  }, [playerData, currentSquad, includeGKPlaytime, isRunning]);

  useEffect(() => {
    if (currentSquad?.players) {
      setPlayerData(prev => [
        ...prev.filter(p => p.isInMatchSquad),
        ...currentSquad.players.map(p => ({
          ...p,
          isInMatchSquad: true,
          isInStartingLineup: false
        }))
      ]);
    }
  }, [currentSquad]);

  return {
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
    isRunning,
    gameIntervals,
    onFieldPlayers,
    offFieldPlayers,
    showEndGameConfirm,
    updatePlayerLists,
    getTotalPlayTime,
    getTimeElapsed,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    toggleTimer,
    assignGoalkeeper,
    handleRemoveLastGoal,
    setShowGoalModal,
    setShowAddPlayerModal,
    handlePlayerAdjustment,
    recordGoalForPlayer
  };
}

export default useGameManagementLogic;