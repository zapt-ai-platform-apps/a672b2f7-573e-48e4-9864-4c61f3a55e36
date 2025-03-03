import { createGoalkeeperHandlers } from "./playerGoalkeeperHandlers";
import { createPlayerAdjustHandlers } from "./playerAdjustHandlers";

export function createPlayerHandlers({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal,
  setShowGKModal,
  setShowGKConfirmModal,
  setAdjustType,
  setShowAdjustModal,
  adjustType,
  selectedPlayer,
  setShowConfirmModal,
  setSelectedPlayer
}) {
  const goalkeeperHandlers = createGoalkeeperHandlers(props, setShowGKModal, setShowGKConfirmModal);
  const adjustHandlers = createPlayerAdjustHandlers({
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
  });

  return {
    assignGoalkeeper: goalkeeperHandlers.assignGoalkeeper,
    confirmGoalkeeper: goalkeeperHandlers.confirmGoalkeeper,
    availableGoalkeepers: goalkeeperHandlers.availableGoalkeepers,
    addNewPlayer: adjustHandlers.addNewPlayer,
    handleIncreasePlayers: adjustHandlers.handleIncreasePlayers,
    handleDecreasePlayers: adjustHandlers.handleDecreasePlayers,
    confirmAdjustment: adjustHandlers.confirmAdjustment
  };
}