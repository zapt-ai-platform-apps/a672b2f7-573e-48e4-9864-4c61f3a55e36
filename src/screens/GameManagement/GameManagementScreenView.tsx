import React from 'react';
import Header from '../../features/GameManagement/components/Header';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import EndGameConfirmationModal from '../../features/GameManagement/modals/EndGameConfirmationModal';
import GoalScoredModal from '../../features/GameManagement/modals/GoalScoredModal';
import PlayerList from '../../features/GameManagement/components/PlayerList';
import BackButton from './BackButton';
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
  return (
    <div className="min-h-screen flex flex-col p-4">
      {!isRunning && <BackButton />}
      
      <Header
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={getTimeElapsed}
        handleEndGame={handleEndGame}
        ourScore={ourScore}
        opponentScore={opponentScore}
      />

      <div className="max-w-6xl mx-auto space-y-6 w-full">
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

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-lg"
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