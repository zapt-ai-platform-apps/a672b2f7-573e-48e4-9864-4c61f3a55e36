import { changeGoalkeeper } from '../../../shared/models/goalkeeperModel';
import { Dispatch, SetStateAction } from 'react';

interface PlayerGoalkeeperProps {
  playerData: any[];
  goalkeeper: string;
  isRunning: boolean;
  updatePlayerLists: () => void;
  setPlayerData: Dispatch<SetStateAction<any[]>>;
  setGoalkeeper: (goalkeeper: string) => void;
  onFieldPlayers: any[];
}

export function createGoalkeeperHandlers(
  props: PlayerGoalkeeperProps,
  setShowGKModal: Dispatch<SetStateAction<boolean>>,
  setShowGKConfirmModal: Dispatch<SetStateAction<boolean>>
): {
  assignGoalkeeper: () => void;
  confirmGoalkeeper: (playerName: string) => void;
  availableGoalkeepers: () => any[];
} {
  const assignGoalkeeper = (): void => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName: string): void => {
    const updatedPlayers = changeGoalkeeper(props.playerData, playerName, props.goalkeeper, props.isRunning);
    props.setPlayerData(updatedPlayers);
    props.setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);
    props.updatePlayerLists();
  };

  const availableGoalkeepers = (): any[] => {
    return props.onFieldPlayers.filter(player => player.name !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}