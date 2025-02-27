import React from 'react';
import Header from '../../features/GameManagement/components/Header';
import { EndGameConfirmationModal } from '../../features/GameManagement/components/GameModalAndVisualization';
import { GameManagementScreenViewProps } from './GameManagementScreenView.types';
import { timeFormatter } from './utils/timeFormatter';

export default function GameManagementScreenViewContent({
  playerData,
  isRunning,
  ourScore,
  opponentScore,
  getTimeElapsed,
  toggleTimer,
  handleEndGame,
  showEndGameConfirm,
  confirmEndGame,
  cancelEndGame
}: GameManagementScreenViewProps): JSX.Element {
  // Format time for display
  const formattedTimeElapsed = (): string => {
    const seconds = getTimeElapsed();
    return timeFormatter(seconds);
  };

  return (
    <div className="w-full">
      <Header
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={formattedTimeElapsed}
        handleEndGame={handleEndGame}
        ourScore={ourScore}
        opponentScore={opponentScore}
      />

      <EndGameConfirmationModal
        showEndGameConfirm={showEndGameConfirm}
        confirmEndGame={confirmEndGame}
        cancelEndGame={cancelEndGame}
      />
    </div>
  );
}