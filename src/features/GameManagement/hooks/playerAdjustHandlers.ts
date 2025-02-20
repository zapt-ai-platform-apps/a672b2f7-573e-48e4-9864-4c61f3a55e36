import { applyPlayerAdjustment } from '../../../shared/models/playerModel';
import { Dispatch, SetStateAction } from 'react';

interface PlayerAdjustProps {
  playerData: any[];
  setPlayerData: Dispatch<SetStateAction<any[]>>;
  updatePlayerLists: () => void;
  isRunning: boolean;
}

interface ConfirmAdjustmentParams {
  props: PlayerAdjustProps;
  adjustType: string;
  selectedPlayer: any;
  setShowConfirmModal: Dispatch<SetStateAction<boolean>>;
  setSelectedPlayer: Dispatch<SetStateAction<any>>;
}

export function createHandleIncreasePlayers(
  setAdjustType: Dispatch<SetStateAction<string>>,
  setShowAdjustModal: Dispatch<SetStateAction<boolean>>
): () => void {
  return (): void => {
    setAdjustType("increase");
    setShowAdjustModal(true);
  };
}

export function createHandleDecreasePlayers(
  setAdjustType: Dispatch<SetStateAction<string>>,
  setShowAdjustModal: Dispatch<SetStateAction<boolean>>
): () => void {
  return (): void => {
    setAdjustType("decrease");
    setShowAdjustModal(true);
  };
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
      const updatedPlayers = applyPlayerAdjustment(props.playerData, adjustType, selectedPlayer, props.isRunning);
      props.setPlayerData(updatedPlayers);
      props.updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };
}