import { applyPlayerAdjustment } from '../../../shared/models/playerModel';

export function createHandleIncreasePlayers(
  setAdjustType: (type: string) => void,
  setShowAdjustModal: (show: boolean) => void
): () => void {
  return () => {
    setAdjustType("increase");
    setShowAdjustModal(true);
  };
}

export function createHandleDecreasePlayers(
  setAdjustType: (type: string) => void,
  setShowAdjustModal: (show: boolean) => void
): () => void {
  return () => {
    setAdjustType("decrease");
    setShowAdjustModal(true);
  };
}

interface ConfirmAdjustmentParams {
  props: {
    playerData: any[];
    isRunning: boolean;
    setPlayerData: (players: any[]) => void;
    updatePlayerLists: () => void;
  };
  adjustType: string;
  selectedPlayer: any;
  setShowConfirmModal: (show: boolean) => void;
  setSelectedPlayer: (player: any) => void;
}

export function createConfirmAdjustment({
  props,
  adjustType,
  selectedPlayer,
  setShowConfirmModal,
  setSelectedPlayer
}: ConfirmAdjustmentParams): () => void {
  return (): void => {
    if (selectedPlayer) {
      const updatedPlayers = applyPlayerAdjustment(
        props.playerData,
        adjustType,
        selectedPlayer,
        props.isRunning
      );
      props.setPlayerData(updatedPlayers);
      props.updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };
}