import { Player, Position } from '../../../types/GameTypes';

/**
 * Ensures that a partial player object has all required properties of the Player interface.
 * Provides default values for missing properties.
 */
export function ensurePlayerProperties(player: Partial<Player>): Player {
  // Default position if not provided
  const defaultPosition: Position = { x: 0, y: 0 };
  
  return {
    id: player.id || '',
    name: player.name || '',
    totalPlayTime: player.totalPlayTime ?? 0,
    isOnField: player.isOnField ?? false,
    isGoalkeeper: player.isGoalkeeper ?? false,
    position: player.position || defaultPosition,
    // Optional properties with their original values or undefined
    number: player.number,
    playTime: player.playTime,
    lastStart: player.lastStart,
    isInMatchSquad: player.isInMatchSquad,
    isStartingPlayer: player.isStartingPlayer,
    isInStartingLineup: player.isInStartingLineup,
    status: player.status,
    minutesPlayed: player.minutesPlayed,
    playIntervals: player.playIntervals,
    selected: player.selected
  };
}