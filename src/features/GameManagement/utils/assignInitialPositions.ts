import { Player } from '../../../types/GameTypes';

/**
 * Assigns initial positions to players if they don't have positions yet
 * Players are arranged in a standard football formation pattern
 */
export function assignInitialPositions(players: Player[]): Player[] {
  if (!players || players.length === 0) return [];

  // Define formation positions (4-4-2 formation as an example)
  const defaultPositions = [
    // Goalkeeper
    { x: 10, y: 50 },
    // Defenders
    { x: 25, y: 20 }, { x: 25, y: 40 }, { x: 25, y: 60 }, { x: 25, y: 80 },
    // Midfielders
    { x: 50, y: 20 }, { x: 50, y: 40 }, { x: 50, y: 60 }, { x: 50, y: 80 },
    // Forwards
    { x: 75, y: 35 }, { x: 75, y: 65 },
    // Extra positions for more players
    { x: 60, y: 50 }, { x: 40, y: 50 }, { x: 60, y: 30 }, { x: 60, y: 70 },
    { x: 40, y: 30 }, { x: 40, y: 70 }, { x: 80, y: 50 }, { x: 20, y: 50 },
  ];

  return players.map((player, index) => {
    // If player already has a valid position, keep it
    if (player.position && 
        typeof player.position.x === 'number' && 
        typeof player.position.y === 'number' &&
        !isNaN(player.position.x) && 
        !isNaN(player.position.y)) {
      return player;
    }
    
    // Otherwise, assign a default position
    const positionIndex = Math.min(index, defaultPositions.length - 1);
    return {
      ...player,
      position: defaultPositions[positionIndex]
    };
  });
}