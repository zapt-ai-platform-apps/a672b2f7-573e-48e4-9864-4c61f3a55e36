import { Player, Position } from '../../../types/GameTypes';

/**
 * Creates a player object with default values
 */
function createPlayer({ name }: { name: string }): Player {
  const position: Position = { x: 0, y: 0 };
  return {
    id: Date.now().toString(),
    name,
    position,
    isOnField: false,
    isGoalkeeper: false,
    totalPlayTime: 0,
    isInMatchSquad: true,
    isInStartingLineup: true,
    isStartingPlayer: true,
    playIntervals: []
  };
}

/**
 * Adds a new player to the starting players list
 */
export function addPlayer(
  playerName: string,
  setStartingPlayers: (update: (prev: Player[]) => Player[]) => void,
  setPlayerName: (name: string) => void
): void {
  if (playerName.trim() !== '') {
    setStartingPlayers((prev: Player[]) => {
      const player = createPlayer({ name: playerName.trim() });
      return [...prev, player];
    });
    setPlayerName('');
  }
}