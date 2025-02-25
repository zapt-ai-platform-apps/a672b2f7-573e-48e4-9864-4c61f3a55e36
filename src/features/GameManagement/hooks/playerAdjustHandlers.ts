import { handlePlayerAdjustment } from '../../../shared/models/playerAdjustments';
import type { Player } from '../../../types/GameTypes';

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
    playerData: Player[];
    isRunning: boolean;
    setPlayerData: (players: Player[]) => void;
    updatePlayerLists: () => void;
  };
  adjustType: string;
  selectedPlayer: Player | null;
  setShowConfirmModal: (show: boolean) => void;
  setSelectedPlayer: (player: Player | null) => void;
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
      // Updated to use handlePlayerAdjustment with the correct parameter structure
      const updatedPlayers = handlePlayerAdjustment(
        props.playerData,
        selectedPlayer.id,
        adjustType === "increase"
      );
      props.setPlayerData(updatedPlayers);
      props.updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };
}