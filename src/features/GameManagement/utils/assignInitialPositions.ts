import { Player } from '../../../types/GameTypes';

/**
 * Assigns initial positions to players that don't have valid positions
 * @param players - Array of players to assign positions to
 * @returns Array of players with assigned positions
 */
export function assignInitialPositions(players: Player[]): Player[] {
  if (!players || !Array.isArray(players)) {
    console.warn('Invalid players array provided to assignInitialPositions');
    return [];
  }

  return players.map(player => {
    // Check if player has a valid position
    const hasValidPosition = player.position && 
      typeof player.position === 'object' &&
      typeof player.position.x === 'number' && 
      typeof player.position.y === 'number';
    
    // If player already has valid position, use it
    if (hasValidPosition) {
      return player;
    }
    
    // Otherwise, assign random position within the pitch
    return {
      ...player,
      position: {
        x: Math.random() * 80 + 10, // 10-90% of width
        y: Math.random() * 80 + 10  // 10-90% of height
      }
    };
  });
}