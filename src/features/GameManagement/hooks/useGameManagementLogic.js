import { useState, useEffect } from 'react';
import { useStateContext } from '../../../state';
import { calculateTotalPlayTime, processPlayerLists, calculateElapsedTime } from './helpers';

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
    return calculateTotalPlayTime(player, includeGKPlaytime, isRunning);
  };

  const updatePlayerLists = () => {
    const { onField, offField } = processPlayerLists(playerData, includeGKPlaytime, isRunning);
    setOnFieldPlayers(onField);
    setOffFieldPlayers(offField);
  };

  const getTimeElapsed = () => {
    return calculateElapsedTime(gameIntervals, isRunning);
  };

  const handleEndGame = () => {
    setShowEndGameConfirm(true);
  };

  const confirmEndGame = () => {
    setShowEndGameConfirm(false);
  };

  const cancelEndGame = () => {
    setShowEndGameConfirm(false);
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const assignGoalkeeper = () => {
    if (!goalkeeper && playerData.length > 0) {
      setGoalkeeper(playerData[0].name);
    }
  };

  const handleRemoveLastGoal = () => {
    setGoals((prevGoals) => prevGoals.slice(0, -1));
  };

  const handleIncreasePlayers = () => {
    setOnFieldPlayers((prev) => [
      ...prev,
      { id: Date.now(), name: 'New Player', playIntervals: [] }
    ]);
  };

  const handleDecreasePlayers = () => {
    setOnFieldPlayers((prev) => prev.slice(0, -1));
  };

  const recordGoalForPlayer = (playerName) => {
    const time = getTimeElapsed();
    setOurScore((prev) => prev + 1);
    setGoals((prevGoals) => [...prevGoals, { team: 'our', scorerName: playerName, time }]);
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