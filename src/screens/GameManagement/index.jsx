import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import GameManagementContent from './GameManagementContent';

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
    <GameManagementContent
      isRunning={isRunning}
      toggleTimer={toggleTimer}
      getTimeElapsed={getTimeElapsed}
      handleEndGame={handleEndGame}
      ourScore={ourScore}
      opponentScore={opponentScore}
      playerData={playerData}
      setPlayerData={setPlayerData}
      includeGKPlaytime={includeGKPlaytime}
      updatePlayerLists={updatePlayerLists}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
      showEndGameConfirm={showEndGameConfirm}
      confirmEndGame={confirmEndGame}
      cancelEndGame={cancelEndGame}
      recordGoalForPlayer={recordGoalForPlayer}
    />
  );
}

export default GameManagementScreen;