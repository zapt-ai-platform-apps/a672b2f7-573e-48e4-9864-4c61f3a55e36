import { parsePlayers } from '../../utils/parsePlayers.js';
import * as Sentry from '@sentry/browser';

/**
 * @typedef {Object} Player
 * @property {string} name - Name of the player.
 * @property {boolean} [isStartingPlayer] - Indicates if the player is a starting player.
 */

/**
 * @typedef {Object} Squad
 * @property {Array<Player>} players - Array of player objects or a single player object.
 */

/**
 * Processes the selected squad to extract the starting players with default starting status.
 * Ensures that each player's name is a string.
 * @param {Squad} selectedSquad - The selected squad object.
 * @param {any} [matchSquad] - (Optional) The match squad data.
 * @returns {Array<Player>} Array of starting players.
 */
export function getStartingPlayers(selectedSquad, matchSquad) {
  try {
    if (!selectedSquad || !selectedSquad.players) {
      return [];
    }
    
    let playersArray = [];
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
      // Ensure name is always a string
      let nameValue = player.name;
      if (nameValue && typeof nameValue === 'object') {
        nameValue = nameValue.name || JSON.stringify(nameValue);
      }
      
      return { 
        ...player, 
        name: String(nameValue || ''), // Force string conversion
        isStartingPlayer: player.isStartingPlayer !== undefined ? player.isStartingPlayer : false 
      };
    });
  } catch (error) {
    console.error('Error processing starting players:', error);
    Sentry.captureException(error);
    return [];
  }
}