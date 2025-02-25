import { Player, Position } from '../types/GameTypes';

/**
 * Parses a text string containing player names (one per line)
 * and converts it to an array of Player objects
 * @param text Text string containing player names
 * @returns Array of Player objects
 */
export function parsePlayers(text: string): Player[] {
  return text
    .split('\n')
    .map(name => name.trim())
    .filter(name => name)
    .map(name => ({
      id: String(Date.now() + Math.random()),
      name,
      isStartingPlayer: false,
      totalPlayTime: 0,
      playTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      position: { x: 0, y: 0 } as Position,
      // Ensure all required properties are initialized
      lastStart: undefined,
      isInMatchSquad: false,
      isInStartingLineup: false,
      playIntervals: []
    }));
}