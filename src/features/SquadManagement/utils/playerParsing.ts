import * as Sentry from "@sentry/browser";

/**
 * Parses a players string from the database into an array of player names.
 * Handles both JSON-formatted arrays and comma-separated strings with or without brackets.
 * 
 * @param players - The players data to parse (string or array)
 * @param errorContext - Context for error logging
 * @returns Array of player names
 */
export function parsePlayers(players: any, errorContext: string): string[] {
  // If already an array, return it directly
  if (Array.isArray(players)) {
    return players;
  }
  
  // Handle string input
  if (typeof players === "string") {
    try {
      const trimmedPlayers = players.trim();
      
      // Empty string case
      if (!trimmedPlayers) {
        return [];
      }
      
      // Check if it looks like an array representation
      if (trimmedPlayers.startsWith('[') && trimmedPlayers.endsWith(']')) {
        // If it starts with a quote after the opening bracket, it's likely valid JSON
        const mightBeValidJson = trimmedPlayers.charAt(1) === '"' || trimmedPlayers.charAt(1) === "'" || trimmedPlayers === '[]';
        
        if (mightBeValidJson) {
          try {
            return JSON.parse(trimmedPlayers);
          } catch (jsonError) {
            console.warn(`Failed to parse as JSON in ${errorContext}:`, jsonError);
            // Continue to fallback parsing method
          }
        }
        
        // Fallback: remove brackets and split by comma
        const innerContent = trimmedPlayers.substring(1, trimmedPlayers.length - 1);
        console.log(`Parsing non-JSON array format in ${errorContext}: ${trimmedPlayers}`);
        return innerContent.split(',').map(name => name.trim()).filter(Boolean);
      } 
      
      // Simple comma-separated string
      console.log(`Parsing comma-separated string in ${errorContext}: ${trimmedPlayers}`);
      return trimmedPlayers.split(',').map(name => name.trim()).filter(Boolean);
    } catch (error) {
      console.error(`Error parsing players in ${errorContext}:`, error);
      Sentry.captureException(error);
      return [];
    }
  }
  
  // If we reach here, the input was neither a string nor an array
  console.warn(`Unexpected players format in ${errorContext}:`, players);
  return [];
}