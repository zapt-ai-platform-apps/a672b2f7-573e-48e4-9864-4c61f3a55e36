import React from 'react';
import type { Player } from '../../../types/GameTypes';
import PlayerList from './PlayerList';
import SubstitutionConfirmationModal from './SubstitutionConfirmationModal';

interface SubstitutionPanelProps {
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  timeFormatter: (seconds: number) => string;
  getTotalPlayTime: (player: Player) => number;
  selectedSubOffPlayer: Player | null;
  selectedSubOnPlayer: Player | null;
  handleSubOffPlayerClick: (player: Player) => void;
  handleSubOnPlayerClick: (player: Player) => void;
  confirmSubstitution: () => void;
  cancelSubstitution: () => void;
  showSubstitutionConfirmModal: boolean;
  playerData?: Player[];
  isRunning?: boolean;
}

function SubstitutionPanel({
  onFieldPlayers,
  offFieldPlayers,
  timeFormatter,
  getTotalPlayTime,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  handleSubOffPlayerClick,
  handleSubOnPlayerClick,
  confirmSubstitution,
  cancelSubstitution,
  showSubstitutionConfirmModal
}: SubstitutionPanelProps): JSX.Element {
  return (
    <div className="grid md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <PlayerList
        players={onFieldPlayers}
        title="Players On Field"
        emptyMessage="No players on field"
        selectedPlayer={selectedSubOffPlayer}
        onPlayerClick={handleSubOffPlayerClick}
        timeFormatter={timeFormatter}
        getTotalPlayTime={getTotalPlayTime}
        selectedItemClass="bg-red-200 dark:bg-red-900"
        defaultItemClass="bg-white dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-800"
        showGoalkeeper={true}
      />

      <PlayerList
        players={offFieldPlayers}
        title="Substitutes"
        emptyMessage="No substitutes available"
        selectedPlayer={selectedSubOnPlayer}
        onPlayerClick={handleSubOnPlayerClick}
        timeFormatter={timeFormatter}
        getTotalPlayTime={getTotalPlayTime}
        selectedItemClass="bg-green-200 dark:bg-green-900"
        defaultItemClass="bg-white dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-800"
      />

      {showSubstitutionConfirmModal && (
        <SubstitutionConfirmationModal
          selectedSubOffPlayer={selectedSubOffPlayer}
          selectedSubOnPlayer={selectedSubOnPlayer}
          confirmSubstitution={confirmSubstitution}
          cancelSubstitution={cancelSubstitution}
        />
      )}
    </div>
  );
}

export default SubstitutionPanel;