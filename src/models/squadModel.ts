import parsePlayers from '../utils/parsePlayers';
import * as Sentry from "@sentry/browser";

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
  return typeof players === 'string' ? players : '';
}

/**
 * Transforms a squad row from the database.
 * @param row - Database row object.
 * @returns Transformed squad object with parsed players.
 */
export function transformSquadFromDB(row: Record<string, unknown>): Record<string, unknown> {
  try {
    // Fix: Explicitly check if row.players is a string, otherwise use an empty string
    const playersData = typeof row.players === 'string' ? row.players : '';
    
    // We use the updated parsePlayers function that handles both CSV and JSON formats
    return {
      ...row,
      players: parsePlayers(playersData)
    };
  } catch (error) {
    console.error("Error transforming squad from DB:", error);
    Sentry.captureException(error);
    
    // Return row with empty players array in case of error
    return {
      ...row,
      players: []
    };
  }
}