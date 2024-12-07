import { createSignal } from 'solid-js';
import PlayerList from './PlayerList';
import ConfirmSubstitutionModal from './ConfirmSubstitutionModal';
import { useSubstitutionLogic } from './substitutionLogic';

function SubstitutionControls(props) {
  const {
    playerData,
    setPlayerData,
    isRunning,
    updatePlayerLists,
    onFieldPlayers,
    offFieldPlayers,
    getTotalPlayTime,
  } = props;

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
    playerData,
    setPlayerData,
    isRunning,
    updatePlayerLists,
  });

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <PlayerList
          players={onFieldPlayers}
          title="Players on Field"
          message="Select a player to sub off"
          selectedPlayer={selectedSubOffPlayer}
          handlePlayerClick={handleSubOffPlayerClick}
          getTotalPlayTime={getTotalPlayTime}
        />
        <PlayerList
          players={offFieldPlayers}
          title="Players Off Field"
          message="Select a player to sub on"
          selectedPlayer={selectedSubOnPlayer}
          handlePlayerClick={handleSubOnPlayerClick}
          getTotalPlayTime={getTotalPlayTime}
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