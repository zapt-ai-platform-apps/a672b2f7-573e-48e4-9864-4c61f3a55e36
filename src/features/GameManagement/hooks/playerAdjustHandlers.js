import { 
  createAddNewPlayer, 
  createHandleIncreasePlayers, 
  createHandleDecreasePlayers, 
  createConfirmAdjustment 
} from "./playerAdjustHandlers.utils";

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