import { changeGoalkeeper } from '../../../shared/models/goalkeeperModel';

interface GoalkeeperProps {
  playerData: any[];
  goalkeeper: string;
  isRunning: boolean;
  updatePlayerLists: () => void;
  setPlayerData: (players: any[]) => void;
  onFieldPlayers: any[];
  setGoalkeeper: (goalkeeper: string) => void;
}

export function createGoalkeeperHandlers(
  props: GoalkeeperProps,
  setShowGKModal: (show: boolean) => void,
  setShowGKConfirmModal: (show: boolean) => void
) {
  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName: string) => {
    const updatedPlayers = changeGoalkeeper(props.playerData, playerName, props.goalkeeper, props.isRunning);
    props.setPlayerData(updatedPlayers);
    props.setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);
    props.updatePlayerLists();
  };

  const availableGoalkeepers = () => {
    return props.onFieldPlayers.filter(player => player.name !== props.goalkeeper);
  };

  return {
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers
  };
}