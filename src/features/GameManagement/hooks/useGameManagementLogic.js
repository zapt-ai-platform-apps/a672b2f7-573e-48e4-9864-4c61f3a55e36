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
  handleIncreasePlayers as handleIncreasePlayersHandler,
  handleDecreasePlayers as handleDecreasePlayersHandler,
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
    includeGKPlaytime
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
    const { onField, offField } = updatePlayerListsHandler(playerData, includeGKPlaytime, isRunning);
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
    toggleTimerHandler(setIsRunning);
  };

  const assignGoalkeeper = () => {
    assignGoalkeeperHandler(goalkeeper, playerData, setGoalkeeper);
  };

  const handleRemoveLastGoal = () => {
    handleRemoveLastGoalHandler(setGoals);
  };

  const handleIncreasePlayers = () => {
    handleIncreasePlayersHandler(setOnFieldPlayers);
  };

  const handleDecreasePlayers = () => {
    handleDecreasePlayersHandler(setOnFieldPlayers);
  };

  const recordGoalForPlayer = (playerName) => {
    recordGoalForPlayerHandler(playerName, gameIntervals, isRunning, setOurScore, setGoals);
  };

  useEffect(() => {
    updatePlayerLists();
  }, [playerData, includeGKPlaytime, isRunning]);

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
    handleIncreasePlayers,
    handleDecreasePlayers,
    recordGoalForPlayer
  };
}

export default useGameManagementLogic;