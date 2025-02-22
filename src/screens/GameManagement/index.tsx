import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import GameManagementScreenView from './GameManagementScreenView';
import { Player } from '../../types/GameTypes';

export default function GameManagementScreen(): JSX.Element {
  const {
    playerData,
    isRunning,
    ourScore,
    opponentScore,
    getTimeElapsed,
    toggleTimer,
    handleEndGame,
    showEndGameConfirm,
    confirmEndGame,
    cancelEndGame,
    recordGoal,
    onFieldPlayers,
    offFieldPlayers,
    getTotalPlayTime,
    showGoalModal,
    setShowGoalModal
  } = useGameManagementLogic();

  const handlePlayerClick = (player: Player): void => {
    console.log("Player clicked:", player);
  };

  return (
    <GameManagementScreenView
      playerData={playerData}
      isRunning={isRunning}
      ourScore={ourScore}
      opponentScore={opponentScore}
      getTimeElapsed={getTimeElapsed}
      toggleTimer={toggleTimer}
      handleEndGame={handleEndGame}
      showEndGameConfirm={showEndGameConfirm}
      confirmEndGame={confirmEndGame}
      cancelEndGame={cancelEndGame}
      recordGoal={recordGoal}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
      showGoalModal={showGoalModal}
      setShowGoalModal={setShowGoalModal}
      handlePlayerClick={handlePlayerClick}
    />
  );
}