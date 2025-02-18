import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import Header from '../../features/GameManagement/components/Header';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import PlayerGoalsList from '../../features/GameManagement/components/PlayerGoalsList';
import EndGameConfirmationModal from '../../features/GameManagement/modals/EndGameConfirmationModal';

function GameManagementScreen() {
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
    recordGoalForPlayer,
    onFieldPlayers,
    offFieldPlayers,
    getTotalPlayTime
  } = useGameManagementLogic();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Header
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={getTimeElapsed}
        handleEndGame={handleEndGame}
        ourScore={ourScore}
        opponentScore={opponentScore}
      />

      <div className="max-w-6xl mx-auto space-y-6">
        <PitchVisualization players={onFieldPlayers} />
        
        <SubstitutionPanel
          playerData={playerData}
          isRunning={isRunning}
          onFieldPlayers={onFieldPlayers}
          offFieldPlayers={offFieldPlayers}
          getTotalPlayTime={getTotalPlayTime}
        />

        <PlayerGoalsList
          players={playerData.filter(p => p.isOnField)}
          recordGoalForPlayer={recordGoalForPlayer}
        />
      </div>

      <EndGameConfirmationModal
        showEndGameConfirm={showEndGameConfirm}
        confirmEndGame={confirmEndGame}
        cancelEndGame={cancelEndGame}
      />
    </div>
  );
}

export default GameManagementScreen;