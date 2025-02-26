import type { Player } from '../../../types/GameTypes';
import * as Sentry from '@sentry/browser';

/**
 * Assigns a new goalkeeper from the list of players
 * @param players - Current list of all players
 * @param playerId - ID of the player to be assigned as goalkeeper
 * @returns Updated list of players with the new goalkeeper assigned
 */
export function assignGoalkeeper(players: Player[], playerId: string): Player[] {
  try {
    // First, remove goalkeeper status from all players
    const resetPlayers = players.map(player => ({
      ...player,
      isGoalkeeper: false
    }));

    // Then assign goalkeeper status to the selected player
    return resetPlayers.map(player => {
      if (player.id?.toString() === playerId) {
        return {
          ...player,
          isGoalkeeper: true
        };
      }
      return player;
    });
  } catch (error) {
    console.error('Error assigning goalkeeper:', error);
    Sentry.captureException(error);
    // Return original players if there was an error
    return players;
  }
}

/**
 * Finds the current goalkeeper in the player list
 * @param players - List of all players
 * @returns The current goalkeeper or null if none found
 */
export function getCurrentGoalkeeper(players: Player[]): Player | null {
  return players.find(player => player.isGoalkeeper) || null;
}

/**
 * Handles substituting the goalkeeper with another player
 * @param players - List of all players 
 * @param currentGkId - ID of the current goalkeeper
 * @param newGkId - ID of the player who will become the new goalkeeper
 * @returns Updated player list with the new goalkeeper
 */
export function substituteGoalkeeper(
  players: Player[],
  currentGkId: string,
  newGkId: string
): Player[] {
  try {
    if (currentGkId === newGkId) {
      return players; // No change needed
    }

    return players.map(player => {
      if (player.id?.toString() === currentGkId) {
        return { ...player, isGoalkeeper: false };
      }
      if (player.id?.toString() === newGkId) {
        return { ...player, isGoalkeeper: true };
      }
      return player;
    });
  } catch (error) {
    console.error('Error substituting goalkeeper:', error);
    Sentry.captureException(error);
    return players;
  }
}