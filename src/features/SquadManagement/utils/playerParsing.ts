import * as Sentry from "@sentry/browser";
import { parseCommaSeparated, parseJsonArray, parseNewlineSeparated } from "./playerParsingHelpers";

export function parsePlayers(players: any, errorContext: string = 'unknown'): string[] {
  // Handle array input
  if (Array.isArray(players)) {
    // If it's already an array of strings, return it
    if (players.every(item => typeof item === 'string')) {
      return players;
    }
    
    // If it's an array of objects with name property, extract names
    if (players.some(item => item && typeof item === 'object' && 'name' in item)) {
      return players.map(item => item.name || '').filter(Boolean);
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

      // Log to debug
      console.log(`Parsing players string in ${errorContext}:`, trimmedPlayers);

      if (trimmedPlayers.includes(',')) {
        console.log(`Parsing comma-separated string in ${errorContext}`);
        return parseCommaSeparated(trimmedPlayers);
      }

      if (trimmedPlayers.startsWith('[') && trimmedPlayers.endsWith(']')) {
        return parseJsonArray(trimmedPlayers, errorContext);
      }

      console.log(`Parsing newline-separated string in ${errorContext}`);
      return parseNewlineSeparated(trimmedPlayers);
    } catch (error) {
      console.error(`Error parsing players in ${errorContext}:`, error);
      Sentry.captureException(error);
      
      // Fallback - if all else fails, treat the entire string as a single player name
      if (typeof players === 'string' && players.trim()) {
        console.log(`Fallback: treating entire string as single player in ${errorContext}`);
        return [players.trim()];
      }
      
      return [];
    }
  }

  console.warn(`Unexpected players format in ${errorContext}:`, players);
  return [];
}