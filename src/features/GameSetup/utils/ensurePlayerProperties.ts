import { Player, Position } from '../../../types/GameTypes';

/**
 * Ensures all required properties are present on a player object
 * and that they have the correct types
 */
export function ensurePlayerProperties(player: Partial<Player>): Player {
  // Ensure position is an object with x and y values
  const position: Position = typeof player.position === 'object' && player.position !== null
    ? {
        x: typeof player.position.x === 'number' ? player.position.x : 0, // Changed from null to 0
        y: typeof player.position.y === 'number' ? player.position.y : 0  // Changed from null to 0
      }
    : { x: 0, y: 0 }; // Changed from null, null to 0, 0

  return {
    id: player.id || '',
    name: player.name || '',
    number: player.number || '',
    totalPlayTime: player.totalPlayTime || 0,
    playTime: player.playTime || 0,
    lastStart: player.lastStart || 0,
    isOnField: player.isOnField || false,
    isGoalkeeper: player.isGoalkeeper || false,
    isInMatchSquad: player.isInMatchSquad || false,
    isStartingPlayer: player.isStartingPlayer || false,
    isInStartingLineup: player.isInStartingLineup || false,
    position,
    status: player.status || '',
    playIntervals: player.playIntervals || []
  };
}