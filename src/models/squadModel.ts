import { parsePlayers } from '../utils/playerParsingUtils.js';
import * as Sentry from "@sentry/browser";
import { Player } from '../types/GameTypes';

export interface SquadData {
  name?: string;
  players?: Player[] | string;
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
export function transformPlayersForDB(players: Player[] | string): string {
  if (Array.isArray(players)) {
    // Convert to array of strings if needed
    const playerNames = players.map(p => 
      typeof p === 'string' ? p : (
        typeof p === 'object' && p !== null && 'name' in p ? 
        String((p as {name: unknown}).name) : 
        String(p)
      )
    );
    return JSON.stringify(playerNames);
  }
  
  if (typeof players === 'string') {
    // If it's already a JSON string starting with [ and ending with ]
    if (players.trim().startsWith('[') && players.trim().endsWith(']')) {
      try {
        // Validate it's a proper JSON array
        const parsed = JSON.parse(players);
        if (Array.isArray(parsed)) {
          return players; // Return the valid JSON string as is
        }
      } catch (e) {
        // Not valid JSON, continue to process as a regular string
      }
    }
    
    // If it's a regular string, parse it to get player names
    const playerNames = parsePlayers(players, 'transformPlayersForDB');
    return JSON.stringify(playerNames);
  }
  
  return '[]'; // Return empty array if input is invalid
}

/**
 * Transforms a squad row from the database.
 * @param row - Database row object.
 * @returns Transformed squad object with parsed players.
 */
export function transformSquadFromDB(row: Record<string, unknown>): Record<string, unknown> {
  try {
    // Log the players data type and content for debugging
    console.log('transformSquadFromDB - players data type:', typeof row.players);
    if (typeof row.players === 'string') {
      console.log('transformSquadFromDB - players content:', row.players.substring(0, 100) + (row.players.length > 100 ? '...' : ''));
    }
    
    // Fix: Explicitly check if row.players is a string, otherwise use an empty string
    const playersData = typeof row.players === 'string' ? row.players : '';
    
    // We use the parsePlayers function that handles both CSV and JSON formats
    const parsedPlayers = parsePlayers(playersData, `squad-${row.id}`);
    console.log('transformSquadFromDB - parsed players:', parsedPlayers);
    
    return {
      ...row,
      players: parsedPlayers
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