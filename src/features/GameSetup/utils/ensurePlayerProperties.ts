import { ExtendedPlayer } from '../types/ExtendedPlayer';

/**
 * Ensures that all required player properties are present.
 * If any are missing, default values will be applied.
 * 
 * @param player The player object to ensure properties for
 * @returns A player object with all required properties
 */
export function ensurePlayerProperties(player: any): ExtendedPlayer {
  if (!player) {
    throw new Error('Cannot ensure properties for undefined player');
  }

  return {
    id: player.id || '',
    name: player.name || '',
    isInMatchSquad: player.isInMatchSquad || false,
    totalPlayTime: player.totalPlayTime || 0,
    isOnField: player.isOnField || false,
    isGoalkeeper: player.isGoalkeeper || false,
    position: player.position || null,
  };
}