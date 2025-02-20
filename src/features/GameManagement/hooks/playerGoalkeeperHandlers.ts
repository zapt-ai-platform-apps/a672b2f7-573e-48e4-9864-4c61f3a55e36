import { changeGoalkeeper } from '../../../shared/models/goalkeeperModel';
import type { Player } from '../../../types/GameTypes';

interface GoalkeeperProps {
  playerData: Player[];
  goalkeeper: string;
  isRunning: boolean;
  setPlayerData: (players: Player[]) => void;
  setGoalkeeper: (name: string) => void;
  updatePlayerLists: () => void;
  onFieldPlayers: Player[];
}

export function createGoalkeeperHandlers(
  props: GoalkeeperProps,
  setShowGKModal: (show: boolean) => void,
  setShowGKConfirmModal: (show: boolean) => void
) {
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

  const availableGoalkeepers = (): Player[] => {
    return props.onFieldPlayers.filter((player) => player.name !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}