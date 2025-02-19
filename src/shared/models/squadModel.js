import { parsePlayers } from '../../utils/parsePlayers.js';

/**
 * Validates squad creation data.
 * @param {Object} data - Squad data object.
 * @throws {Error} If required fields are missing.
 */
export function validateSquadCreation(data) {
  if (!data.name || !data.players) {
    throw new Error('Name and players are required');
  }
}

/**
 * Transforms players data for database insertion.
 * @param {Array|string} players - Players array or string.
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
 * @param {Object} row - Database row object.
 * @returns {Object} Transformed squad object with parsed players.
 */
export function transformSquadFromDB(row) {
  return {
    ...row,
    players: parsePlayers(row.players)
  };
}