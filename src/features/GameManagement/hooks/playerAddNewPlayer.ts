import { createPlayer } from '../../../shared/models/player';
import { calculateMinPlayTime } from '../../../shared/models/playerUtils';
import type { Player } from '../../../shared/models/player';

interface PlayerProps {
  playerData: Player[];
  setPlayerData: (players: Player[]) => void;
  updatePlayerLists: () => void;
}

interface AddNewPlayerParams {
  props: PlayerProps;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  setShowAddPlayerModal: (show: boolean) => void;
}

export function createAddNewPlayer({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal
}: AddNewPlayerParams): (playerNameOptional?: string) => void {
  return (playerNameOptional?: string): void => {
    const name = playerNameOptional ? playerNameOptional : newPlayerName.trim();
    if (name !== "") {
      const minPlayTime = calculateMinPlayTime(props.playerData);
      const newPlayer: Player = {
        ...createPlayer({ name }),
        playIntervals: [] as number[],
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: minPlayTime,
      };
      props.setPlayerData([...props.playerData, newPlayer]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}