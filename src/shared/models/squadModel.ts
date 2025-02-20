import { parsePlayers } from '../../utils/parsePlayers';

/**
 * Validates squad creation data.
 * @param data - Squad data object.
 * @throws {Error} If required fields are missing.
 */
export function validateSquadCreation(data: { name?: string; players?: any }): void {
  if (!data.name || !data.players) {
    throw new Error('Name and players are required');
  }
}

/**
 * Transforms players data for database insertion.
 * @param players - Players array or string.
 * @returns JSON string of players.
 */
export function transformPlayersForDB(players: any[] | string): string {
  if (Array.isArray(players)) {
    return JSON.stringify(players);
  }
  return players;
}

/**
 * Transforms a squad row from the database.
 * @param row - Database row object.
 * @returns Transformed squad object with parsed players.
 */
export function transformSquadFromDB(row: any): any {
  return {
    ...row,
    players: parsePlayers(row.players)
  };
}