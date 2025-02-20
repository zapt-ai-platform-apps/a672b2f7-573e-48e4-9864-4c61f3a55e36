import { changeGoalkeeper } from '../../../shared/models/goalkeeperModel';

interface GoalkeeperProps {
  playerData: any[];
  goalkeeper: string;
  isRunning: boolean;
  setPlayerData: (players: any[]) => void;
  setGoalkeeper: (name: string) => void;
  updatePlayerLists: () => void;
  onFieldPlayers: any[];
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

  const availableGoalkeepers = (): any[] => {
    return props.onFieldPlayers.filter((player) => player.name !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}