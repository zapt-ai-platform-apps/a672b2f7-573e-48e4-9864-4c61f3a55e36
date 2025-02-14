import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameManagementLogic from '../../features/GameManagement/hooks/useGameManagementLogic.js';
import GameManagementContent from './GameManagementContentBody.jsx';

function GameManagementScreen() {
  const navigate = useNavigate();
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
  } = useGameManagementLogic();

  const [showPitch, setShowPitch] = useState(false);

  const confirmEndGameHandler = () => {
    confirmEndGame();
    navigate('/summary');
  };

  return (
    <GameManagementContent
      isRunning={isRunning}
      toggleTimer={toggleTimer}
      getTimeElapsed={getTimeElapsed}
      handleEndGame={handleEndGame}
      ourScore={ourScore}
      opponentScore={opponentScore}
      includeGKPlaytime={includeGKPlaytime}
      playerData={playerData}
      setPlayerData={setPlayerData}
      updatePlayerLists={updatePlayerLists}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
      showEndGameConfirm={showEndGameConfirm}
      cancelEndGame={cancelEndGame}
      assignGoalkeeper={assignGoalkeeper}
      handleRemoveLastGoal={handleRemoveLastGoal}
      setShowGoalModal={setShowGoalModal}
      setShowAddPlayerModal={setShowAddPlayerModal}
      handleIncreasePlayers={handleIncreasePlayers}
      handleDecreasePlayers={handleDecreasePlayers}
      showPitch={showPitch}
      setShowPitch={setShowPitch}
      confirmEndGameHandler={confirmEndGameHandler}
    />
  );
}

export default GameManagementScreen;