import { createPlayer } from '../../../shared/models/player';
import { calculateMinPlayTime } from '../../../shared/models/playerUtils';
import { Dispatch, SetStateAction } from 'react';

interface PlayerDataProps {
  playerData: any[];
  setPlayerData: Dispatch<SetStateAction<any[]>>;
  updatePlayerLists: () => void;
}

interface CreateAddNewPlayerParams {
  props: PlayerDataProps;
  newPlayerName: string;
  setNewPlayerName: Dispatch<SetStateAction<string>>;
  setShowAddPlayerModal: Dispatch<SetStateAction<boolean>>;
}

export function createAddNewPlayer({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal
}: CreateAddNewPlayerParams): (playerNameOptional?: string) => void {
  return (playerNameOptional?: string): void => {
    const name = playerNameOptional ? playerNameOptional : newPlayerName.trim();
    if (name !== "") {
      const minPlayTime = calculateMinPlayTime(props.playerData);
      const newPlayer = {
        ...createPlayer({ name }),
        playIntervals: [],
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