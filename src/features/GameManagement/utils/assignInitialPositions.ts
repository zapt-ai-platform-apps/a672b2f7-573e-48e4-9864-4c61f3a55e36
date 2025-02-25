import { Player } from '../../../types/GameTypes';

// Function to randomly assign initial positions to players
export function assignInitialPositions(players: Player[]): Player[] {
  return players.map(player => {
    const validPosition = typeof player.position === 'object' && player.position !== null;
    
    // If player already has valid position, use it
    if (validPosition && typeof player.position.x === 'number' && typeof player.position.y === 'number') {
      return player;
    }
    
    // Otherwise, assign random position
    return {
      ...player,
      position: {
        x: Math.random() * 80 + 10, // 10-90% of width
        y: Math.random() * 80 + 10  // 10-90% of height
      }
    };
  });
}