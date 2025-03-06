import React from 'react';
import PlayerList from '../../players/ui/PlayerList.jsx';
import ConfirmSubstitutionModal from './ConfirmSubstitutionModal.jsx';
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
      <div className="md:grid md:grid-cols-2 md:gap-8 mb-6 md:mb-8">
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