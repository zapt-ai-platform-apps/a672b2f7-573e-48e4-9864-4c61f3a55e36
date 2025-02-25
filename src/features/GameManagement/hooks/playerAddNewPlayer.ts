import { createPlayer } from '../../../shared/models/player';
import { calculateTotalPlayTime } from '../../../shared/models/playerUtils';
import type { Player } from '../../../types/GameTypes';

interface PlayInterval {
  start: number;
  end?: number;
}

interface PlayerWithIntervals extends Player {
  playIntervals: PlayInterval[];
  isOnField: boolean;
  isGoalkeeper: boolean;
  totalPlayTime: number;
}

interface PlayerProps {
  playerData: PlayerWithIntervals[];
  setPlayerData: (players: PlayerWithIntervals[]) => void;
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
      // Use calculateTotalPlayTime instead of calculateMinPlayTime
      const defaultPlayTime = props.playerData.length > 0 
        ? calculateTotalPlayTime(props.playerData[0], false, false)
        : 0;
        
      const newPlayer: PlayerWithIntervals = {
        ...createPlayer({ name }),
        playIntervals: [] as PlayInterval[],
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: defaultPlayTime,
      };
      props.setPlayerData([...props.playerData, newPlayer]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}