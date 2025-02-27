import React from 'react';
import Header from '../../features/GameManagement/components/Header';
import { EndGameConfirmationModal } from '../../features/GameManagement/components/GameModalAndVisualization';
import { GameManagementScreenViewProps } from './GameManagementScreenView.types';
import { timeFormatter } from './utils/timeFormatter';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import PlayersSection from './components/PlayersSection';
import RecordGoalButton from './components/RecordGoalButton';
import GoalScoredModal from '../../features/GameManagement/modals/GoalScoredModal';
import { Goal, GoalData } from '../../types/GameTypes';

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
    const seconds = typeof getTimeElapsed() === 'number' 
      ? getTimeElapsed() as number 
      : parseInt(getTimeElapsed() as string, 10);
    return timeFormatter(seconds);
  };

  // Create a default no-op function for handleEndGame if it's undefined
  const safeHandleEndGame = handleEndGame || (() => {});

  const handleRecordGoal = (goal: GoalData) => {
    if (recordGoal && setGoals && setOurScore && setOpponentScore) {
      // Convert GoalData to Goal type for compatibility
      // Ensure the id is always a string to match the Goal type
      const convertedGoal: Goal = {
        team: goal.team,
        scorerName: goal.scorer,
        time: goal.minute,
        id: goal.id || String(Date.now()), // Ensure id is always defined
        minute: goal.minute,
        scorer: goal.scorer,
        scorerId: goal.scorerId || '', // Ensure scorerId is always defined
        timestamp: goal.timestamp || Date.now() // Ensure timestamp is always defined
      };
      
      // Type-safe implementation to handle the callback correctly
      const updatedGoalsHandler = (newGoalsOrCallback: Goal[] | ((prevGoals: Goal[]) => Goal[])) => {
        if (typeof newGoalsOrCallback === 'function') {
          setGoals(prevGoals => newGoalsOrCallback(prevGoals));
        } else {
          setGoals(newGoalsOrCallback);
        }
      };
      
      recordGoal(goal, updatedGoalsHandler, setOurScore, setOpponentScore);
      setShowGoalModal(false);
    }
  };

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
          onScoreGoal={handleRecordGoal}
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