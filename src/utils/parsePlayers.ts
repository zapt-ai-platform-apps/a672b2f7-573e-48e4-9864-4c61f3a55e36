import { Player, Position } from '../types/GameTypes';
import * as Sentry from "@sentry/browser";

/**
 * Parses a text string containing player names (comma-separated or newline-separated)
 * and converts it to an array of Player objects
 * @param text Text string containing player names
 * @returns Array of Player objects
 */
export function parsePlayers(text: string | unknown): Player[] {
  if (!text) {
    return [];
  }

  // If already an array, convert directly to Player objects
  if (Array.isArray(text)) {
    return text.map(name => createPlayerObject(name));
  }

  if (typeof text !== 'string') {
    console.warn("parsePlayers received non-string input:", text);
    return [];
  }

  try {
    let names: string[] = [];
    const trimmedText = text.trim();
    
    // Empty input check
    if (!trimmedText) {
      return [];
    }
    
    // Try to parse as JSON first if it looks like JSON
    if (trimmedText.startsWith('[') && trimmedText.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmedText);
        if (Array.isArray(parsed)) {
          names = parsed;
        }
      } catch (e) {
        console.warn("Failed to parse player data as JSON:", e);
        // JSON parse failed, will continue to other methods
      }
    }
    
    // If JSON parsing didn't work, check for commas
    if (names.length === 0 && trimmedText.includes(',')) {
      names = trimmedText.split(',').map(name => name.trim()).filter(Boolean);
    } 
    // If not comma-separated, try newline
    else if (names.length === 0) {
      names = trimmedText.split('\n').map(name => name.trim()).filter(Boolean);
    }

    return names.map(name => createPlayerObject(name));
  } catch (error) {
    console.error("Error parsing players:", error);
    Sentry.captureException(error);
    return [];
  }
}

/**
 * Creates a player object with required properties
 */
function createPlayerObject(name: string): Player {
  return {
    id: String(Date.now() + Math.random()),
    name,
    isStartingPlayer: false,
    totalPlayTime: 0,
    playTime: 0,
    isOnField: false,
    isGoalkeeper: false,
    position: { x: 0, y: 0 } as Position,
    lastStart: undefined,
    isInMatchSquad: false,
    isInStartingLineup: false,
    playIntervals: []
  };
}