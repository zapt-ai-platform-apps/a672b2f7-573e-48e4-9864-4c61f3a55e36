import * as Sentry from "@sentry/browser";

export function parsePlayers(players: any, errorContext: string): any[] {
  if (typeof players === "string") {
    try {
      const trimmedPlayers = players.trim();
      if (trimmedPlayers.startsWith('[')) {
        return JSON.parse(trimmedPlayers);
      } else {
        return trimmedPlayers ? trimmedPlayers.split(',') : [];
      }
    } catch (error) {
      console.error(`Error parsing ${errorContext}:`, error);
      Sentry.captureException(error);
      return [];
    }
  }
  return players;
}