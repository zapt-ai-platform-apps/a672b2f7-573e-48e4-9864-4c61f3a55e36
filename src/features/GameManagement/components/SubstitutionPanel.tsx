import React from 'react';
import { PlayerList, ConfirmSubstitutionModal } from './SubComponents';
import { useSubstitutionLogic } from '../hooks/substitutionLogic';

interface SubstitutionPanelProps {
  playerData: any[];
  setPlayerData: React.Dispatch<React.SetStateAction<any[]>>;
  isRunning: boolean;
  onFieldPlayers: any[];
  offFieldPlayers: any[];
  getTotalPlayTime: (player: any) => string | number;
}

function SubstitutionPanel({
  playerData,
  setPlayerData,
  isRunning,
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime,
}: SubstitutionPanelProps): JSX.Element {
  const {
    selectedSubOffPlayer,
    selectedSubOnPlayer,
    showSubstitutionConfirmModal,
    confirmSubstitution,
    cancelSubstitution,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick
  } = useSubstitutionLogic({
    playerData,
    setPlayerData,
    isRunning,
    updatePlayerLists: () => ({ onFieldPlayers, offFieldPlayers })
  });

  return (
    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Substitution Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlayerList
          players={onFieldPlayers}
          title="On Field"
          message="Click player to substitute out"
          getTotalPlayTime={getTotalPlayTime}
          handlePlayerClick={handleSubOffPlayerClick}
          selectedPlayer={selectedSubOffPlayer}
        />
        <PlayerList
          players={offFieldPlayers}
          title="Off Field"
          message="Click player to substitute in"
          getTotalPlayTime={getTotalPlayTime}
          handlePlayerClick={handleSubOnPlayerClick}
          selectedPlayer={selectedSubOnPlayer}
        />
      </div>
      
      <ConfirmSubstitutionModal
        showModal={showSubstitutionConfirmModal}
        selectedSubOffPlayer={selectedSubOffPlayer}
        selectedSubOnPlayer={selectedSubOnPlayer}
        confirmSubstitution={confirmSubstitution}
        cancelSubstitution={cancelSubstitution}
      />
    </div>
  );
}

export default SubstitutionPanel;