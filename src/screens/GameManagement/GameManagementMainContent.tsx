import React from 'react';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel';
import RecordGoalButton from './components/RecordGoalButton';
import { timeFormatter } from './utils/timeFormatter';
import type { GameManagementScreenViewProps } from './GameManagementScreenView.types';

interface GameManagementMainContentProps {
  playerData: GameManagementScreenViewProps["playerData"];
  isRunning: GameManagementScreenViewProps["isRunning"];
  onFieldPlayers: GameManagementScreenViewProps["onFieldPlayers"];
  offFieldPlayers: GameManagementScreenViewProps["offFieldPlayers"];
  getTotalPlayTime: GameManagementScreenViewProps["getTotalPlayTime"];
  handlePlayerClick: GameManagementScreenViewProps["handlePlayerClick"];
  setShowGoalModal: GameManagementScreenViewProps["setShowGoalModal"];
}

export default function GameManagementMainContent({
  playerData,
  isRunning,
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime,
  handlePlayerClick,
  setShowGoalModal
}: GameManagementMainContentProps): JSX.Element {
  return (
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
        handleSubOffPlayerClick={() => {}}
        handleSubOnPlayerClick={() => {}}
        confirmSubstitution={() => {}}
        cancelSubstitution={() => {}}
        showSubstitutionConfirmModal={false}
      />
      {/* Removed PlayersSection component to eliminate duplication */}
      <div className="flex justify-center mb-8">
        <RecordGoalButton setShowGoalModal={setShowGoalModal} />
      </div>
    </div>
  );
}