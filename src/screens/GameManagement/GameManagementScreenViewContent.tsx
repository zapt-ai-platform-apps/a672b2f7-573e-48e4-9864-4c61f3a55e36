import React from 'react';
import Header from '../../features/GameManagement/components/Header';
import EndGameConfirmationModal from '../../features/GameManagement/modals/EndGameConfirmationModal';
import GoalScoredModal from '../../features/GameManagement/modals/GoalScoredModal';
import BackButton from './BackButton';
import GameManagementMainContent from './GameManagementMainContent';
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
      <GameManagementMainContent
        playerData={playerData}
        isRunning={isRunning}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
        handlePlayerClick={handlePlayerClick}
        setShowGoalModal={setShowGoalModal}
      />
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