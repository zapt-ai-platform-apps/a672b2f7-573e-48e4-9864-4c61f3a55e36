import { useState } from 'react';

function useGameManagementLogic() {
  const [playerData, setPlayerData] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState(null);
  const [ourScore, setOurScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [goals, setGoals] = useState([]);
  const [includeGKPlaytime] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [gameIntervals] = useState([]);
  const [onFieldPlayers, setOnFieldPlayers] = useState([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState([]);
  const [showEndGameConfirm, setShowEndGameConfirm] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const updatePlayerLists = () => {
    // Implement logic to update player lists if needed
  };

  const getTotalPlayTime = () => {
    return 0;
  };

  const getTimeElapsed = () => {
    return '00:00';
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
    setGoalkeeper(playerData[0] || null);
  };

  const handleRemoveLastGoal = () => {
    setGoals((prevGoals) => prevGoals.slice(0, -1));
  };

  const handleIncreasePlayers = () => {
    setOnFieldPlayers((prev) => [...prev, { id: Date.now(), name: 'New Player' }]);
  };

  const handleDecreasePlayers = () => {
    setOnFieldPlayers((prev) => prev.slice(0, -1));
  };

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
    handleDecreasePlayers
  };
}

export default useGameManagementLogic;