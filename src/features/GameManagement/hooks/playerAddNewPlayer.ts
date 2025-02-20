import { createPlayer } from '../../../shared/models/player';
import { calculateMinPlayTime } from '../../../shared/models/playerUtils';

interface AddNewPlayerProps {
  playerData: any[];
  setPlayerData: (players: any[]) => void;
  updatePlayerLists: () => void;
}

interface CreateAddNewPlayerParams {
  props: AddNewPlayerProps;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  setShowAddPlayerModal: (show: boolean) => void;
}

/**
 * Creates a handler to add a new player.
 *
 * @param params - Parameters object.
 * @returns A function to add a new player.
 */
export function createAddNewPlayer({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal
}: CreateAddNewPlayerParams): (playerNameOptional?: string) => void {
  return (playerNameOptional?: string) => {
    const name = playerNameOptional ? playerNameOptional : newPlayerName.trim();
    if (name !== "") {
      const minPlayTime = calculateMinPlayTime(props.playerData);
      const newPlayer = {
        ...createPlayer({ name }),
        playIntervals: [] as any[],
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: minPlayTime
      };
      props.setPlayerData([...props.playerData, newPlayer]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}