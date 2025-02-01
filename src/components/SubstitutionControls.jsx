import React from 'react';
import PlayerList from './PlayerList';
import ConfirmSubstitutionModal from './ConfirmSubstitutionModal';
import { useSubstitutionLogic } from './substitutionLogic';

function SubstitutionControls(props) {
  const {
    selectedSubOffPlayer,
    setSelectedSubOffPlayer,
    selectedSubOnPlayer,
    setSelectedSubOnPlayer,
    showSubstitutionConfirmModal,
    setShowSubstitutionConfirmModal,
    confirmSubstitution,
    cancelSubstitution,
    handleSubOffPlayerClick,
    handleSubOnPlayerClick,
  } = useSubstitutionLogic({
    playerData: props.playerData,
    setPlayerData: props.setPlayerData,
    isRunning: props.isRunning,
    updatePlayerLists: props.updatePlayerLists,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <PlayerList
          players={props.onFieldPlayers}
          title="Players on Field"
          message="Select a player to sub off"
          selectedPlayer={selectedSubOffPlayer}
          handlePlayerClick={handleSubOffPlayerClick}
          getTotalPlayTime={props.getTotalPlayTime}
        />
        <PlayerList
          players={props.offFieldPlayers}
          title="Players Off Field"
          message="Select a player to sub on"
          selectedPlayer={selectedSubOnPlayer}
          handlePlayerClick={handleSubOnPlayerClick}
          getTotalPlayTime={props.getTotalPlayTime}
        />
      </div>

      <ConfirmSubstitutionModal
        showModal={showSubstitutionConfirmModal}
        selectedSubOffPlayer={selectedSubOffPlayer}
        selectedSubOnPlayer={selectedSubOnPlayer}
        confirmSubstitution={confirmSubstitution}
        cancelSubstitution={cancelSubstitution}
      />
    </>
  );
}

export default SubstitutionControls;