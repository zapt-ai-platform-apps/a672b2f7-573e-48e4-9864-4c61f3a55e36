import { Player, Position } from '../../../types/GameTypes';

/**
 * Ensures all player objects have the required properties
 * This is used when loading players from different sources that might
 * have different property structures
 */
export function ensurePlayerProperties(players: Player[]): Player[] {
  return players.map(player => ({
    ...player,
    totalPlayTime: player.totalPlayTime || 0,
    isOnField: typeof player.isOnField === 'boolean' ? player.isOnField : false,
    isGoalkeeper: typeof player.isGoalkeeper === 'boolean' ? player.isGoalkeeper : false,
    isStartingPlayer: typeof player.isStartingPlayer === 'boolean' ? player.isStartingPlayer : false,
    isInStartingLineup: typeof player.isInStartingLineup === 'boolean' ? player.isInStartingLineup : false,
    isInMatchSquad: typeof player.isInMatchSquad === 'boolean' ? player.isInMatchSquad : false,
    position: typeof player.position === 'string' 
      ? { x: 0, y: 0 } as Position 
      : (player.position || { x: 0, y: 0 }) as Position,
    playTime: player.playTime || 0,
    playIntervals: player.playIntervals || []
  }));
}