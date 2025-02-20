import { parsePlayers } from '../../utils/parsePlayers';
import * as Sentry from '@sentry/browser';

export interface Player {
  name: string;
  isStartingPlayer?: boolean;
  [key: string]: any;
}

export interface Squad {
  players: Player[] | Player;
}

/**
 * Processes the selected squad to extract the starting players with default starting status.
 * Ensures that each player's name is a string.
 * @param selectedSquad - The selected squad object.
 * @param matchSquad - (Optional) The match squad data.
 * @returns Array of starting players.
 */
export function getStartingPlayers(selectedSquad: Squad, matchSquad?: any): Player[] {
  try {
    if (!selectedSquad || !selectedSquad.players) {
      return [];
    }
    
    let playersArray: any[] = [];
    if (Array.isArray(selectedSquad.players)) {
      playersArray = selectedSquad.players;
    } else if (typeof selectedSquad.players === 'object') {
      playersArray = selectedSquad.players ? [selectedSquad.players] : [];
    } else if (typeof selectedSquad.players === 'string') {
      playersArray = parsePlayers(selectedSquad.players);
    } else {
      return [];
    }

    return playersArray.map(player => {
      let nameValue = player.name;
      if (nameValue && typeof nameValue === 'object') {
        nameValue = nameValue.name || JSON.stringify(nameValue);
      }
      
      return { 
        ...player, 
        name: String(nameValue || ''), 
        isStartingPlayer: player.isStartingPlayer !== undefined ? player.isStartingPlayer : false 
      };
    });
  } catch (error) {
    console.error('Error processing starting players:', error);
    Sentry.captureException(error);
    return [];
  }
}