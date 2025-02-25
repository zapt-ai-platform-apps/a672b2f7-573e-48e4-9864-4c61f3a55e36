import { changeGoalkeeper } from '../../../models/goalkeeperModel';
import type { Player } from '../../../types/GameTypes';

interface GoalkeeperProps {
  playerData: Player[];
  goalkeeper: Player | null;
  isRunning: boolean;
  setPlayerData: (players: Player[]) => void;
  setGoalkeeper: (player: Player | null) => void;
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

  const confirmGoalkeeper = (player: Player): void => {
    const updatedPlayers = changeGoalkeeper(props.playerData, player, props.goalkeeper, props.isRunning);
    props.setPlayerData(updatedPlayers);
    props.setGoalkeeper(player);
    setShowGKConfirmModal(false);
    setShowGKModal(false);
    props.updatePlayerLists();
  };

  const availableGoalkeepers = (): Player[] => {
    return props.onFieldPlayers.filter((player) => player !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}