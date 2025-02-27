import React from 'react';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import { GameActions } from '../../features/GameManagement/components/GameActions';
import { timeFormatter } from './utils/timeFormatter';
import { Player, Goal } from '../../types/GameTypes';
import AssignGoalkeeperModal from '../../features/GameManagement/modals/AssignGoalkeeperModal';
import { useGameManagementLogic } from '../../features/GameManagement/hooks';

interface MainContentProps {
  playerData: Player[];
  isRunning: boolean;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (player: Player) => number;
  handlePlayerClick?: (player: Player) => void;
  setShowGoalModal: (value: boolean) => void;
  timerControls: {
    now: number;
    startUITimer: () => void;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    getTimeElapsed: () => number;
    timeElapsed: number;
    gameIntervals: Array<{ startTime: number; endTime?: number }>;
    isRunning: boolean;
    startGame: () => void;
    pauseGame: () => void;
    toggleTimer: () => boolean;
  };
  ourScore: number;
  opponentScore: number;
  goals?: Goal[];
  setGoals?: (goals: Goal[]) => void;
  setOurScore?: (score: number) => void;
  setOpponentScore?: (score: number) => void;
}

export default function GameManagementMainContent({
  playerData,
  isRunning,
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime,
  setShowGoalModal,
  timerControls,
  ourScore,
  opponentScore,
  goals = [],
  setGoals = () => {},
  setOurScore = () => {},
  setOpponentScore = () => {}
}: MainContentProps): JSX.Element {
  const {
    selectedSubOffPlayer,
    selectedSubOnPlayer,
    showSubstitutionConfirmModal,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick,
    confirmSubstitution,
    cancelSubstitution,
    assignGoalkeeper,
    handleRemoveLastGoal,
    handleIncreasePlayers,
    handleDecreasePlayers,
    showAssignGkModal,
    setShowAssignGkModal,
    handleAssignGkConfirm,
    currentGoalkeeper,
    setShowAddPlayerModal
  } = useGameManagementLogic();

  // Only render players who are on the field for the pitch visualization
  const playersOnField = playerData.filter(player => player.isOnField);

  // Create a wrapper function that doesn't require parameters
  const handleRemoveLastGoalWrapper = () => {
    handleRemoveLastGoal(goals, ourScore, opponentScore, setGoals, setOurScore, setOpponentScore);
  };

  // Create wrapper functions for player operations
  const handleIncreasePlayersWrapper = () => {
    handleIncreasePlayers(playerData, (updatedPlayers) => {
      // You might need to update this based on your app's state management
    });
  };

  const handleDecreasePlayersWrapper = () => {
    handleDecreasePlayers(playerData, (updatedPlayers) => {
      // You might need to update this based on your app's state management
    });
  };

  // Function to handle assigning goalkeeper that extracts the ID
  const handleAssignGoalkeeperConfirm = (player: Player) => {
    // Fixed: Pass player ID string instead of the whole player object
    handleAssignGkConfirm(player.id as string);
  };

  return (
    <div className="flex flex-col space-y-8 mt-8">
      <PitchVisualization players={playersOnField} />

      <h2 className="text-2xl font-bold mb-4 text-white">
        Substitutions
      </h2>
      <SubstitutionPanel
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        timeFormatter={timeFormatter}
        getTotalPlayTime={getTotalPlayTime}
        selectedSubOffPlayer={selectedSubOffPlayer}
        selectedSubOnPlayer={selectedSubOnPlayer}
        handleSubOffPlayerClick={handleSubOffPlayerClick}
        handleSubOnPlayerClick={handleSubOnPlayerClick}
        confirmSubstitution={confirmSubstitution}
        cancelSubstitution={cancelSubstitution}
        showSubstitutionConfirmModal={showSubstitutionConfirmModal}
        isRunning={isRunning}
      />

      <GameActions
        assignGoalkeeper={assignGoalkeeper}
        handleRemoveLastGoal={handleRemoveLastGoalWrapper}
        setShowGoalModal={setShowGoalModal}
        setShowAddPlayerModal={setShowAddPlayerModal}
        handleIncreasePlayers={handleIncreasePlayersWrapper}
        handleDecreasePlayers={handleDecreasePlayersWrapper}
        isRunning={isRunning}
      />

      <AssignGoalkeeperModal
        isOpen={showAssignGkModal}
        onClose={() => setShowAssignGkModal(false)}
        players={playerData}
        onAssign={(playerId: string) => handleAssignGkConfirm(playerId)}
        currentGoalkeeper={currentGoalkeeper}
      />
    </div>
  );
}