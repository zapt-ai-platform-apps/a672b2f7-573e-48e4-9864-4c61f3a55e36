import React from 'react';
import Header from '../../features/GameManagement/components/Header';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import EndGameConfirmationModal from '../../features/GameManagement/modals/EndGameConfirmationModal';
import GoalScoredModal from '../../features/GameManagement/modals/GoalScoredModal';
import PlayersSection from './components/PlayersSection';
import BackButton from './BackButton';
import { timeFormatter } from './utils/timeFormatter';
import RecordGoalButton from './components/RecordGoalButton';
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
          timeFormatter={timeFormatter}
          selectedSubOffPlayer={null}
          selectedSubOnPlayer={null}
          handleSubOffClick={() => {}}
          handleSubOnClick={() => {}}
          handleConfirmSubstitution={() => {}}
          showSubstitutionConfirmModal={false}
        />
        <PlayersSection
          onFieldPlayers={onFieldPlayers}
          offFieldPlayers={offFieldPlayers}
          getTotalPlayTime={getTotalPlayTime}
          handlePlayerClick={handlePlayerClick}
        />
        <div className="flex justify-center mb-8">
          <RecordGoalButton setShowGoalModal={setShowGoalModal} />
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