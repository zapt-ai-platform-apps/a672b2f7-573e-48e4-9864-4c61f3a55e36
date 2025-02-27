import { Player } from '../../types/GameTypes';

/**
 * Creates a new player with the specified properties.
 * 
 * @param params Player creation parameters
 * @returns A new player object with default values for unspecified properties
 */
export function createPlayer({
  name,
  isInMatchSquad,
  isInStartingLineup
}: {
  name: string;
  isInMatchSquad?: boolean;
  isInStartingLineup?: boolean;
}): Player {
  return {
    id: String(Date.now() + Math.random()), // Convert to string
    name,
    playIntervals: [],
    isOnField: false,
    isGoalkeeper: false,
    totalPlayTime: 0,
    position: { x: 0, y: 0 },
    isInMatchSquad: isInMatchSquad ?? false,
    isInStartingLineup: isInStartingLineup ?? false,
  };
}