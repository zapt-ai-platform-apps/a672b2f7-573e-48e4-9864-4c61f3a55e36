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
    isInMatchSquad: player.isInMatchSquad ?? false,
    isInStartingLineup: player.isInStartingLineup ?? false,
    playIntervals: player.playIntervals || [],
    // Include number property (now part of Player interface)
    number: player.number,
    // Optional properties with their original values or undefined
    playTime: player.playTime,
    lastStart: player.lastStart,
    isStartingPlayer: player.isStartingPlayer,
    status: player.status,
    minutesPlayed: player.minutesPlayed,
    selected: player.selected
  };
}