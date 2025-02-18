import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import Header from '../../features/GameManagement/components/Header.jsx';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization.jsx';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel.jsx';
import PlayerGoalsList from '../../features/GameManagement/components/PlayerGoalsList.jsx';
import { EndGameConfirmationModal } from '../../features/GameManagement/components/GameModalAndVisualization.jsx';

function GameManagementScreen() {
  const {
    playerData,
    setPlayerData,
    isRunning,
    includeGKPlaytime,
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
    handlePlayerAdjustment,
    recordGoalForPlayer
  } = useGameManagementLogic();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 p-4">
      <Header 
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={getTimeElapsed}
        handleEndGame={handleEndGame}
        ourScore={ourScore}
        opponentScore={opponentScore}
      />
      
      <PitchVisualization 
        players={onFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
      />
      
      <SubstitutionPanel
        playerData={playerData}
        setPlayerData={setPlayerData}
        isRunning={isRunning}
        includeGKPlaytime={includeGKPlaytime}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
        handlePlayerAdjustment={handlePlayerAdjustment}
      />
      
      <PlayerGoalsList 
        players={playerData}
        recordGoalForPlayer={recordGoalForPlayer}
      />
      
      {showEndGameConfirm && (
        <EndGameConfirmationModal
          showEndGameConfirm={showEndGameConfirm}
          confirmEndGame={confirmEndGame}
          cancelEndGame={cancelEndGame}
        />
      )}
    </div>
  );
}

export default GameManagementScreen;