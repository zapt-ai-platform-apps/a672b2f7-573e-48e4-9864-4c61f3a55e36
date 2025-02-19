import { parsePlayers } from '../../utils/parsePlayers.js';

/**
 * @typedef {Object} Squad
 * @property {string} name - The name of the squad.
 * @property {Array<any>} players - Array of player objects.
 */

/**
 * Validates squad creation data.
 * @param {Squad} data - Squad data object.
 * @throws {Error} If required fields are missing.
 */
export function validateSquadCreation(data) {
  if (!data.name || !data.players) {
    throw new Error('Name and players are required');
  }
}

/**
 * Transforms players data for database insertion.
 * @param {Array<any>|string} players - Players array or string.
 * @returns {string} JSON string of players.
 */
export function transformPlayersForDB(players) {
  if (Array.isArray(players)) {
    return JSON.stringify(players);
  }
  return players;
}

/**
 * Transforms a squad row from the database.
 * @param {Squad} row - Database row object.
 * @returns {Squad} Transformed squad object with parsed players.
 */
export function transformSquadFromDB(row) {
  return {
    ...row,
    players: parsePlayers(row.players)
  };
}