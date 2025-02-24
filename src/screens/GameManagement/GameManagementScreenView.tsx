import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../features/GameManagement/components/Header';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import EndGameConfirmationModal from '../../features/GameManagement/modals/EndGameConfirmationModal';
import GoalScoredModal from '../../features/GameManagement/modals/GoalScoredModal';
import PlayerList from '../../features/GameManagement/components/PlayerList';
import type { GameManagementScreenViewProps } from './GameManagementScreenView.types';

export default function GameManagementScreenView({
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
  setShowGoalModal,
  handlePlayerClick
}: GameManagementScreenViewProps): JSX.Element {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {!isRunning && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors cursor-pointer shadow-sm"
          >
            ← Back
          </button>
        </div>
      )}
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PlayerList
            players={onFieldPlayers}
            title="On Field Players"
            message="Players currently on the field"
            getTotalPlayTime={getTotalPlayTime}
            handlePlayerClick={handlePlayerClick}
          />
          <PlayerList
            players={offFieldPlayers}
            title="Bench Players"
            message="Players currently on the bench"
            getTotalPlayTime={getTotalPlayTime}
            handlePlayerClick={handlePlayerClick}
          />
        </div>

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