import { Player, Position } from '../../../types/GameTypes';

/**
 * Creates a new player with the specified properties
 */
export function createPlayer(id: string, name: string): Player {
  const defaultPosition: Position = { x: 0, y: 0 };
  
  return {
    id,
    name,
    isInMatchSquad: false,
    isInStartingLineup: false,
    isStartingPlayer: false,
    isOnField: false,
    isGoalkeeper: false,
    totalPlayTime: 0,
    position: defaultPosition,
    playIntervals: []
  };
}

/**
 * Toggles a player's match squad status
 */
export function togglePlayerInMatchSquad(player: Player): Player {
  return {
    ...player,
    isInMatchSquad: !player.isInMatchSquad,
    // If removing from match squad, also remove from starting lineup
    isInStartingLineup: player.isInMatchSquad ? false : player.isInStartingLineup
  };
}

/**
 * Toggles a player's starting lineup status
 */
export function togglePlayerInStartingLineup(player: Player): Player {
  // Can only be in starting lineup if they're in the match squad
  if (!player.isInMatchSquad) {
    return player;
  }
  
  return {
    ...player,
    isInStartingLineup: !player.isInStartingLineup
  };
}