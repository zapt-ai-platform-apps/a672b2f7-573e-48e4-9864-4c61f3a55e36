import React from 'react';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import { GameActions } from '../../features/GameManagement/components/GameActions';
import { timeFormatter } from './utils/timeFormatter';
import { Player } from '../../types/GameTypes';
import AssignGoalkeeperModal from '../../features/GameManagement/modals/AssignGoalkeeperModal';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';

interface MainContentProps {
  playerData: Player[];
  isRunning: boolean;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (player: Player) => number;
  handlePlayerClick: (player: Player) => void;
  setShowGoalModal: (value: boolean) => void;
}

export default function GameManagementMainContent({
  playerData,
  isRunning,
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime,
  setShowGoalModal
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
        handleRemoveLastGoal={handleRemoveLastGoal}
        setShowGoalModal={setShowGoalModal}
        setShowAddPlayerModal={setShowAddPlayerModal}
        handleIncreasePlayers={handleIncreasePlayers}
        handleDecreasePlayers={handleDecreasePlayers}
        isRunning={isRunning}
      />

      <AssignGoalkeeperModal
        isOpen={showAssignGkModal}
        onClose={() => setShowAssignGkModal(false)}
        players={playerData}
        onAssign={handleAssignGkConfirm}
        currentGoalkeeper={currentGoalkeeper}
      />
    </div>
  );
}