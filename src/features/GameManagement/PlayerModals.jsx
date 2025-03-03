import React from 'react';
import AddPlayerModal from '@/modules/players/ui/AddPlayerModal.jsx';
import AdjustPlayersModal from '@/modules/players/ui/AdjustPlayersModal.jsx';
import ConfirmAdjustPlayersModal from '@/modules/players/ui/ConfirmAdjustPlayersModal.jsx';

function PlayerModals(props) {
  return (
    <>
      <AddPlayerModal
        showAddPlayerModal={props.showAddPlayerModal}
        setShowAddPlayerModal={props.setShowAddPlayerModal}
        newPlayerName={props.newPlayerName}
        setNewPlayerName={props.setNewPlayerName}
        addNewPlayer={props.addNewPlayer}
      />

      <AdjustPlayersModal
        showAdjustModal={props.showAdjustModal}
        setShowAdjustModal={props.setShowAdjustModal}
        adjustType={props.adjustType}
        onFieldPlayers={props.onFieldPlayers}
        offFieldPlayers={props.offFieldPlayers}
        setSelectedPlayer={props.setSelectedPlayer}
        setShowConfirmModal={props.setShowConfirmModal}
      />

      <ConfirmAdjustPlayersModal
        showConfirmModal={props.showConfirmModal}
        setShowConfirmModal={props.setShowConfirmModal}
        selectedPlayer={props.selectedPlayer}
        adjustType={props.adjustType}
        confirmAdjustment={props.confirmAdjustment}
      />
    </>
  );
}

export default PlayerModals;