import type { Player } from '../../types/GameTypes';

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
}): Player & { isInMatchSquad?: boolean; isInStartingLineup?: boolean } {
  return {
    id: Date.now() + Math.random(),
    name,
    playIntervals: [],
    isOnField: false,
    isGoalkeeper: false,
    totalPlayTime: 0,
    position: { x: null, y: null },
    isInMatchSquad: isInMatchSquad ?? false,
    isInStartingLineup: isInStartingLineup ?? false,
  };
}