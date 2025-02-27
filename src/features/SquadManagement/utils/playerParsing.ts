import * as Sentry from "@sentry/browser";
import { parseCommaSeparated, parseJsonArray, parseNewlineSeparated } from "./playerParsingHelpers";

/**
 * Parses players data from various formats into a string array
 * 
 * @param players - The players data to parse (can be array, string, etc.)
 * @param errorContext - Context identifier for error logging
 * @returns Array of player names as strings
 */
export function parsePlayers(players: any, errorContext: string = 'unknown'): string[] {
  // Log input for debugging
  console.log(`Parsing players (${errorContext})`, typeof players, players);
  
  // Handle array input
  if (Array.isArray(players)) {
    console.log(`Parsing array in ${errorContext}`, players);
    
    // If it's already an array of strings, return it
    if (players.every(item => typeof item === 'string')) {
      return players;
    }
    
    // If it's an array of objects with name property, extract names
    if (players.some(item => item && typeof item === 'object' && 'name' in item)) {
      return players.map(item => item && typeof item === 'object' && 'name' in item ? item.name : String(item))
        .filter(Boolean);
    }
    
    // Otherwise convert each item to string
    return players.map(item => String(item));
  }

  // Handle string input
  if (typeof players === "string") {
    try {
      const trimmedPlayers = players.trim();

      if (!trimmedPlayers) {
        return [];
      }

      // Try to parse as JSON first if it looks like JSON
      if (trimmedPlayers.startsWith('[') && trimmedPlayers.endsWith(']')) {
        const parsed = parseJsonArray(trimmedPlayers, errorContext);
        console.log(`Parsed JSON array in ${errorContext}:`, parsed);
        return parsed;
      }

      // For CSV format
      if (trimmedPlayers.includes(',')) {
        const parsed = parseCommaSeparated(trimmedPlayers);
        console.log(`Parsed comma-separated string in ${errorContext}:`, parsed);
        return parsed;
      }

      // For newline format
      const parsed = parseNewlineSeparated(trimmedPlayers);
      console.log(`Parsed newline-separated string in ${errorContext}:`, parsed);
      return parsed;
    } catch (error) {
      console.error(`Error parsing players in ${errorContext}:`, error);
      Sentry.captureException(error);
      
      // Fallback - if all else fails, treat the entire string as a single player name
      if (players.trim()) {
        console.log(`Fallback: treating entire string as single player in ${errorContext}`);
        return [players.trim()];
      }
      
      return [];
    }
  }

  console.warn(`Unexpected players format in ${errorContext}:`, players);
  return [];
}