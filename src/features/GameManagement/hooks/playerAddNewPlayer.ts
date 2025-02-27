import { createPlayer } from '../../../shared/models/player';
import { calculateTotalPlayTime } from '../../../shared/models/timeUtils';
import type { Player, Position } from '../../../types/GameTypes';

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
      // Use calculateTotalPlayTime with correct parameter count
      const defaultPlayTime = props.playerData.length > 0 
        ? calculateTotalPlayTime(props.playerData[0], false, false)
        : 0;
        
      // Fix: Create proper Position object
      const defaultPosition: Position = { x: 0, y: 0 };
      
      const newPlayer: PlayerWithIntervals = {
        ...createPlayer({ name }),
        playIntervals: [] as PlayInterval[],
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: defaultPlayTime,
        position: defaultPosition,
        isInStartingLineup: false,
        isInMatchSquad: false // Added required property
      };
      props.setPlayerData([...props.playerData, newPlayer]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}