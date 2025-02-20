import { applyPlayerAdjustment } from '../../../shared/models/playerModel';

interface PlayerAdjustProps {
  playerData: any[];
  setPlayerData: (players: any[]) => void;
  isRunning: boolean;
  updatePlayerLists: () => void;
}

export function createHandleIncreasePlayers(
  setAdjustType: (value: string) => void,
  setShowAdjustModal: (value: boolean) => void
): () => void {
  return () => {
    setAdjustType("increase");
    setShowAdjustModal(true);
  };
}

export function createHandleDecreasePlayers(
  setAdjustType: (value: string) => void,
  setShowAdjustModal: (value: boolean) => void
): () => void {
  return () => {
    setAdjustType("decrease");
    setShowAdjustModal(true);
  };
}

interface ConfirmAdjustmentParams {
  props: PlayerAdjustProps;
  adjustType: string;
  selectedPlayer: any;
  setShowConfirmModal: (value: boolean) => void;
  setSelectedPlayer: (player: any | null) => void;
}

export function createConfirmAdjustment({
  props,
  adjustType,
  selectedPlayer,
  setShowConfirmModal,
  setSelectedPlayer
}: ConfirmAdjustmentParams): () => void {
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