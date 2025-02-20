import { createGoalkeeperHandlers } from "./playerGoalkeeperHandlers";
import { createPlayerAdjustHandlers } from "./playerAdjustHandlers";

interface PlayerManagementParams {
  props: any;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  setShowAddPlayerModal: (show: boolean) => void;
  setShowGKModal: (show: boolean) => void;
  setShowGKConfirmModal: (show: boolean) => void;
  setAdjustType: (type: any) => void;
  setShowAdjustModal: (show: boolean) => void;
  adjustType: any;
  selectedPlayer: any;
  setShowConfirmModal: (show: boolean) => void;
  setSelectedPlayer: (player: any) => void;
}

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
  setSelectedPlayer,
}: PlayerManagementParams) {
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
    setSelectedPlayer,
  });

  return {
    assignGoalkeeper: goalkeeperHandlers.assignGoalkeeper,
    confirmGoalkeeper: goalkeeperHandlers.confirmGoalkeeper,
    availableGoalkeepers: goalkeeperHandlers.availableGoalkeepers,
    addNewPlayer: adjustHandlers.addNewPlayer,
    handleIncreasePlayers: adjustHandlers.handleIncreasePlayers,
    handleDecreasePlayers: adjustHandlers.handleDecreasePlayers,
    confirmAdjustment: adjustHandlers.confirmAdjustment,
  };
}