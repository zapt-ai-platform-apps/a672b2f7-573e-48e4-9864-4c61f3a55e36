import { applyPlayerAdjustment } from '../../../shared/models/playerModel.js';

export function createHandleIncreasePlayers(setAdjustType, setShowAdjustModal) {
  return () => {
    setAdjustType("increase");
    setShowAdjustModal(true);
  };
}

export function createHandleDecreasePlayers(setAdjustType, setShowAdjustModal) {
  return () => {
    setAdjustType("decrease");
    setShowAdjustModal(true);
  };
}

export function createConfirmAdjustment({ props, adjustType, selectedPlayer, setShowConfirmModal, setSelectedPlayer }) {
  return () => {
    if (selectedPlayer) {
      const updatedPlayers = applyPlayerAdjustment(props.playerData, adjustType, selectedPlayer, props.isRunning);
      props.setPlayerData(updatedPlayers);
      props.updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };
}