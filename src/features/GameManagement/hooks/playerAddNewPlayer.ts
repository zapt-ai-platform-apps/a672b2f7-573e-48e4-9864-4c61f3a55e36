import { Player, Position } from '../../../types/GameTypes';

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

/**
 * Creates a new player with default properties
 */
function createPlayer({ name }: { name: string }): Partial<Player> {
  return {
    id: Date.now().toString(),
    name,
    totalPlayTime: 0,
    isOnField: false,
    isGoalkeeper: false,
    playIntervals: []
  };
}

/**
 * Function to handle adding a new player to the game
 */
export function createAddNewPlayer({
  props,
  newPlayerName,
  setNewPlayerName,
  setShowAddPlayerModal
}: AddNewPlayerParams): (playerNameOptional?: string) => void {
  return (playerNameOptional?: string): void => {
    // Ensure name is always a string, defaulting to empty if undefined
    const name = playerNameOptional ? playerNameOptional.trim() : newPlayerName.trim();
    if (name !== "") {
      // Calculate default play time based on existing players or use 0
      const defaultPlayTime = props.playerData.length > 0 
        ? calculateTotalPlayTime(props.playerData[0], false, false)
        : 0;
        
      const defaultPosition: Position = { x: 0, y: 0 };
      
      // Explicitly type name as string to ensure it matches PlayerWithIntervals expectations
      const newPlayer: PlayerWithIntervals = {
        ...(createPlayer({ name }) as Player), // Ensure it's cast to Player 
        id: Date.now().toString(),
        playIntervals: [] as PlayInterval[],
        isOnField: false,
        isGoalkeeper: false,
        totalPlayTime: defaultPlayTime,
        position: defaultPosition,
        isInStartingLineup: false,
        isInMatchSquad: false
      };
      props.setPlayerData([...props.playerData, newPlayer]);
      setNewPlayerName("");
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };
}

/**
 * Helper function to calculate total play time
 */
function calculateTotalPlayTime(player: PlayerWithIntervals, includeGKPlaytime: boolean, isRunning: boolean): number {
  if (!player.playIntervals) return 0;
  
  let total = 0;
  for (const interval of player.playIntervals) {
    const end = interval.end || (isRunning && player.isOnField ? Date.now() : interval.start);
    total += end - interval.start;
  }
  
  return Math.floor(total / 1000);
}