import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import GameManagementScreenView from './GameManagementScreenView';

function GameManagementScreen() {
  const {
    playerData,
    setPlayerData,
    isRunning,
    includeGKPlaytime,
    updatePlayerLists,
    onFieldPlayers,
    offFieldPlayers,
    getTotalPlayTime,
    getTimeElapsed,
    toggleTimer,
    handleEndGame,
    ourScore,
    opponentScore,
    showEndGameConfirm,
    confirmEndGame,
    cancelEndGame,
    recordGoalForPlayer
  } = useGameManagementLogic();

  console.log("GameManagementScreen rendered with state:", {
    isRunning,
    ourScore,
    opponentScore,
    playerCount: playerData.length
  });

  return (
    <GameManagementScreenView
      playerData={playerData}
      setPlayerData={setPlayerData}
      isRunning={isRunning}
      includeGKPlaytime={includeGKPlaytime}
      updatePlayerLists={updatePlayerLists}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
      getTimeElapsed={getTimeElapsed}
      toggleTimer={toggleTimer}
      handleEndGame={handleEndGame}
      ourScore={ourScore}
      opponentScore={opponentScore}
      showEndGameConfirm={showEndGameConfirm}
      confirmEndGame={confirmEndGame}
      cancelEndGame={cancelEndGame}
      recordGoalForPlayer={recordGoalForPlayer}
    />
  );
}

export default GameManagementScreen;