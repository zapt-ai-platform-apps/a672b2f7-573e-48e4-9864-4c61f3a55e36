import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import Header from '../../features/GameManagement/components/Header';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import EndGameConfirmationModal from '../../features/GameManagement/modals/EndGameConfirmationModal';
import GoalScoredModal from '../../features/GameManagement/modals/GoalScoredModal';

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

        <div className="flex justify-center">
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Record Goal
          </button>
        </div>
      </div>

      <EndGameConfirmationModal
        showEndGameConfirm={showEndGameConfirm}
        confirmEndGame={confirmEndGame}
        cancelEndGame={cancelEndGame}
      />

      <GoalScoredModal
        showGoalModal={showGoalModal}
        setShowGoalModal={setShowGoalModal}
        players={playerData}
        recordGoal={recordGoal}
      />
    </div>
  );
}