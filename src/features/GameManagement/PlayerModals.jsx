import React from 'react';
import AddPlayerModal from '@/components/AddPlayerModal';
import AdjustPlayersModal from '@/components/AdjustPlayersModal';
import ConfirmAdjustPlayersModal from '@/components/ConfirmAdjustPlayersModal';

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