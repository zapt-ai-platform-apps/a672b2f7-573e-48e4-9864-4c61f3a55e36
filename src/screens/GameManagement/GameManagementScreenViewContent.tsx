import React from 'react';
import Header from '../../features/GameManagement/components/Header';
import { EndGameConfirmationModal } from '../../features/GameManagement/components/GameModalAndVisualization';
import { GameManagementScreenViewProps } from './GameManagementScreenView.types';
import { timeFormatter } from './utils/timeFormatter';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import PlayersSection from './components/PlayersSection';
import RecordGoalButton from './components/RecordGoalButton';
import GoalScoredModal from '../../features/GameManagement/modals/GoalScoredModal';
import { GoalData } from '../../types/GameTypes';

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
  cancelEndGame,
  onFieldPlayers,
  offFieldPlayers,
  recordGoal,
  showGoalModal,
  setShowGoalModal,
  goals,
  setGoals,
  setOurScore,
  setOpponentScore,
  timerControls
}: GameManagementScreenViewProps): JSX.Element {
  // Format time for display
  const formattedTimeElapsed = (): string => {
    const seconds = getTimeElapsed();
    return timeFormatter(seconds);
  };

  // Create a default no-op function for handleEndGame if it's undefined
  const safeHandleEndGame = handleEndGame || (() => {});

  return (
    <div className="w-full">
      <Header
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={formattedTimeElapsed}
        handleEndGame={safeHandleEndGame}
        ourScore={ourScore}
        opponentScore={opponentScore}
      />

      {/* Pitch Visualization Section */}
      <div className="mt-6 mb-8 bg-white/5 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Field View</h2>
        <PitchVisualization 
          players={playerData || []}
          data-testid="pitch-visualization" 
        />
      </div>

      {/* Players Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlayersSection
          title="On Field Players"
          players={onFieldPlayers || []}
          isRunning={isRunning}
          timerControls={timerControls}
        />
        <PlayersSection
          title="Substitutes"
          players={offFieldPlayers || []}
          isRunning={isRunning}
          timerControls={timerControls}
        />
      </div>

      {/* Record Goal Button */}
      <div className="flex justify-center mt-6">
        <RecordGoalButton onClick={() => setShowGoalModal(true)} />
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <GoalScoredModal
          onClose={() => setShowGoalModal(false)}
          onScoreGoal={(goal: GoalData) => {
            if (recordGoal) {
              recordGoal(goal, setGoals, setOurScore, setOpponentScore);
              setShowGoalModal(false);
            }
          }}
          playerList={playerData || []}
          currentGoals={goals || []}
        />
      )}

      {/* End Game Confirmation Modal */}
      <EndGameConfirmationModal
        showEndGameConfirm={showEndGameConfirm}
        confirmEndGame={confirmEndGame}
        cancelEndGame={cancelEndGame}
      />
    </div>
  );
}