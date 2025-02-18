import { 
  createAddNewPlayer, 
  createHandleIncreasePlayers, 
  createHandleDecreasePlayers, 
  createConfirmAdjustment 
} from "./playerAdjustHandlers.utils";

/**
 * Creates player adjustment handlers for adding and modifying player data.
 *
 * @param {Object} params - Parameters object.
 * @param {Object} params.props - Component properties including player data and game state.
 * @param {string} params.newPlayerName - The current new player's name.
 * @param {Function} params.setNewPlayerName - Function to update the new player name state.
 * @param {Function} params.setShowAddPlayerModal - Function to toggle the add player modal.
 * @param {Function} params.setAdjustType - Function to set the adjustment type.
 * @param {Function} params.setShowAdjustModal - Function to toggle the adjust modal.
 * @param {string} params.adjustType - The current adjustment type.
 * @param {Object} params.selectedPlayer - The currently selected player for adjustment.
 * @param {Function} params.setShowConfirmModal - Function to toggle the confirmation modal.
 * @param {Function} params.setSelectedPlayer - Function to update the selected player state.
 * @returns {Object} An object containing functions: addNewPlayer, handleIncreasePlayers, handleDecreasePlayers, confirmAdjustment.
 */
export function createPlayerAdjustHandlers({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal,
  setAdjustType,
  setShowAdjustModal,
  adjustType,
  selectedPlayer,
  setShowConfirmModal,
  setSelectedPlayer
}) {
  return {
    addNewPlayer: createAddNewPlayer({
      props,
      newPlayerName,
      setNewPlayerName,
      setShowAddPlayerModal
    }),
    handleIncreasePlayers: createHandleIncreasePlayers(setAdjustType, setShowAdjustModal),
    handleDecreasePlayers: createHandleDecreasePlayers(setAdjustType, setShowAdjustModal),
    confirmAdjustment: createConfirmAdjustment({
      props,
      adjustType,
      selectedPlayer,
      setShowConfirmModal,
      setSelectedPlayer
    })
  };
}