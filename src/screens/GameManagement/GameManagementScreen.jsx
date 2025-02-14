import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import Header from '../../features/GameManagement/components/Header.jsx';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization.jsx';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel.jsx';
import { EndGameConfirmationModal } from '../../features/GameManagement/components/GameManagementComponents.jsx';

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
  } = useGameManagementLogic();

  console.log("GameManagementScreen rendered with state:", {
    isRunning,
    ourScore,
    opponentScore,
    playerCount: playerData.length
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Header
        isRunning={isRunning}
        toggleTimer={() => {
          console.log("Toggle timer clicked");
          toggleTimer();
        }}
        getTimeElapsed={getTimeElapsed}
        handleEndGame={() => {
          console.log("End game triggered");
          handleEndGame();
        }}
        ourScore={ourScore}
        opponentScore={opponentScore}
      />
      <PitchVisualization />
      <SubstitutionPanel
        playerData={playerData}
        setPlayerData={setPlayerData}
        isRunning={isRunning}
        includeGKPlaytime={includeGKPlaytime}
        updatePlayerLists={updatePlayerLists}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
      />
      {showEndGameConfirm && (
        <EndGameConfirmationModal
          showEndGameConfirm={showEndGameConfirm}
          confirmEndGame={() => {
            console.log("Confirming end game");
            confirmEndGame();
          }}
          cancelEndGame={() => {
            console.log("Cancelling end game");
            cancelEndGame();
          }}
        />
      )}
    </div>
  );
}

export default GameManagementScreen;