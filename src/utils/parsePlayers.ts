import { Player } from '../types/GameTypes';

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
      id: Date.now() + Math.random(),
      name,
      isStartingPlayer: false
    }));
}