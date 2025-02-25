import * as Sentry from "@sentry/browser";

export function parsePlayers(players: any, errorContext: string): string[] {
  if (typeof players === "string") {
    try {
      const trimmedPlayers = players.trim();
      
      if (trimmedPlayers.startsWith('[') && trimmedPlayers.endsWith(']')) {
        try {
          // Try to parse as JSON first
          return JSON.parse(trimmedPlayers);
        } catch (jsonError) {
          // If JSON parsing fails, strip brackets and split by comma
          const innerContent = trimmedPlayers.substring(1, trimmedPlayers.length - 1);
          return innerContent.split(',').map(name => name.trim());
        }
      } else {
        // Not surrounded by brackets, just split by comma
        return trimmedPlayers ? trimmedPlayers.split(',').map(name => name.trim()) : [];
      }
    } catch (error) {
      console.error(`Error parsing ${errorContext}:`, error);
      Sentry.captureException(error);
      return [];
    }
  }
  
  // If players is already an array, return it
  if (Array.isArray(players)) {
    return players;
  }
  
  // If it's not a string or array, return an empty array
  return [];
}