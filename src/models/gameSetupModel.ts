import { parsePlayers } from '../utils/parsePlayers';
import * as Sentry from '@sentry/browser';

export interface GamePlayer {
  name: string;
  isStartingPlayer?: boolean;
  [key: string]: unknown;
}

export interface Squad {
  players: GamePlayer[] | GamePlayer | string;
}

/**
 * Processes the selected squad to extract the starting players with default starting status.
 * Ensures that each player's name is a string.
 * @param selectedSquad - The selected squad object.
 * @param matchSquad - (Optional) The match squad data.
 * @returns Array of starting players.
 */
export function getStartingPlayers(selectedSquad: Squad, matchSquad?: unknown): GamePlayer[] {
  try {
    if (!selectedSquad || !selectedSquad.players) {
      return [];
    }
    
    let playersArray: GamePlayer[] = [];
    if (Array.isArray(selectedSquad.players)) {
      playersArray = selectedSquad.players;
    } else if (typeof selectedSquad.players === 'object') {
      playersArray = selectedSquad.players ? [selectedSquad.players as GamePlayer] : [];
    } else if (typeof selectedSquad.players === 'string') {
      // Type conversion fixed: first cast to unknown, then to GamePlayer[]
      playersArray = parsePlayers(selectedSquad.players) as unknown as GamePlayer[];
    } else {
      return [];
    }

    return playersArray.map(player => {
      let nameValue: unknown = player.name;
      if (nameValue && typeof nameValue === 'object') {
        nameValue = (nameValue as { name?: string }).name || JSON.stringify(nameValue);
      }
      
      return { 
        ...player, 
        name: String(nameValue || ''), 
        isStartingPlayer: player.isStartingPlayer !== undefined ? player.isStartingPlayer : false 
      };
    }) as unknown as GamePlayer[]; // Fixed type conversion with double casting
  } catch (error) {
    console.error('Error processing starting players:', error);
    Sentry.captureException(error);
    return [];
  }
}