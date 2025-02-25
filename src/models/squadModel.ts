import { parsePlayers } from '../utils/parsePlayers';

export interface SquadData {
  name?: string;
  players?: unknown[] | string;
}

/**
 * Validates squad creation data.
 * @param data - Squad data object.
 * @throws {Error} If required fields are missing.
 */
export function validateSquadCreation(data: SquadData): void {
  if (!data.name || !data.players) {
    throw new Error('Name and players are required');
  }
}

/**
 * Transforms players data for database insertion.
 * @param players - Players array or string.
 * @returns JSON string of players.
 */
export function transformPlayersForDB(players: unknown[] | string): string {
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
export function transformSquadFromDB(row: Record<string, unknown>): Record<string, unknown> {
  return {
    ...row,
    players: parsePlayers(row.players as string)
  };
}