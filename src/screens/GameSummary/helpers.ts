import { Player } from '@/types/GameTypes';

/**
 * Ensures all player objects have required properties with default values
 * @param players Array of players
 * @returns Array of players with default values for missing properties
 */
export function getPlayersWithDefaults(players: Player[]): Player[] {
  return players.map(player => ({
    id: player.id || Math.random().toString(36).substring(2, 9),
    name: player.name || 'Unknown Player',
    isOnField: player.isOnField || false,
    isGoalkeeper: player.isGoalkeeper || false,
    totalPlayTime: player.totalPlayTime || 0,
    playIntervals: player.playIntervals || [],
    position: player.position || { x: 0, y: 0 },
    isStartingPlayer: player.isStartingPlayer || false
  }));
}

/**
 * Calculates total play time for a player
 * @param player Player object
 * @param includeGKPlaytime Whether to include goalkeeper play time
 * @returns Total play time in seconds
 */
export function calculatePlayerPlayTime(player: Player, includeGKPlaytime: boolean): number {
  // If player is a goalkeeper and we're not including GK playtime, return 0
  if (player.isGoalkeeper && !includeGKPlaytime) {
    return 0;
  }
  
  // Calculate from play intervals if available
  if (player.playIntervals && player.playIntervals.length > 0) {
    return player.playIntervals.reduce((total, interval) => {
      const start = interval.start || 0;
      const end = interval.end || start;
      return total + ((end - start) / 1000);
    }, 0);
  }
  
  // Fall back to totalPlayTime property
  return player.totalPlayTime || 0;
}