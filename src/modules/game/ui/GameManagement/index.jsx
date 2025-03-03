import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGameManagementLogic from '@/modules/game/hooks/useGameManagementLogic';
import Content from './Content.jsx';

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
    recordGoal
  } = useGameManagementLogic();

  const confirmEndGameHandler = () => {
    confirmEndGame();
    navigate('/summary');
  };

  return (
    <Content
      isRunning={isRunning}
      toggleTimer={toggleTimer}
      getTimeElapsed={getTimeElapsed}
      handleEndGame={handleEndGame}
      ourScore={ourScore}
      setOurScore={setOurScore}
      opponentScore={opponentScore}
      setOpponentScore={setOpponentScore}
      includeGKPlaytime={includeGKPlaytime}
      showEndGameConfirm={showEndGameConfirm}
      confirmEndGame={confirmEndGameHandler}
      cancelEndGame={cancelEndGame}
      playerData={playerData}
      setPlayerData={setPlayerData}
      updatePlayerLists={updatePlayerLists}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
      goals={goals}
      setGoals={setGoals}
      goalkeeper={goalkeeper}
      setGoalkeeper={setGoalkeeper}
      recordGoal={recordGoal}
    />
  );
}

export default GameManagementScreen;