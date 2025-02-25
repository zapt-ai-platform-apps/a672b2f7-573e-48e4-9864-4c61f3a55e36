import * as Sentry from "@sentry/browser";
import { parseCommaSeparated, parseJsonArray, parseNewlineSeparated } from "./playerParsingHelpers";

export function parsePlayers(players: any, errorContext: string = 'unknown'): string[] {
  if (Array.isArray(players)) {
    return players;
  }

  if (typeof players === "string") {
    try {
      const trimmedPlayers = players.trim();

      if (!trimmedPlayers) {
        return [];
      }

      if (trimmedPlayers.includes(',')) {
        console.log(`Parsing comma-separated string in ${errorContext}: ${trimmedPlayers}`);
        return parseCommaSeparated(trimmedPlayers);
      }

      if (trimmedPlayers.startsWith('[') && trimmedPlayers.endsWith(']')) {
        return parseJsonArray(trimmedPlayers, errorContext);
      }

      console.log(`Parsing newline-separated string in ${errorContext}: ${trimmedPlayers}`);
      return parseNewlineSeparated(trimmedPlayers);
    } catch (error) {
      console.error(`Error parsing players in ${errorContext}:`, error);
      Sentry.captureException(error);
      return [];
    }
  }

  console.warn(`Unexpected players format in ${errorContext}:`, players);
  return [];
}