import { Player, Position } from '../../../types/GameTypes';

/**
 * Assigns initial field positions to players
 */
export function assignInitialPositions(players: Player[]): Player[] {
  // Get players who are on the field
  const onFieldPlayers = players.filter(player => player.isOnField);
  
  // Calculate positions
  const updatedPlayers = [...players];
  
  // Default formation positions (simplified for example)
  const defaultPositions: Position[] = [
    { x: 50, y: 10 },  // GK
    { x: 25, y: 30 },  // DEF
    { x: 75, y: 30 },  // DEF
    { x: 20, y: 60 },  // MID
    { x: 50, y: 50 },  // MID
    { x: 80, y: 60 },  // MID
    { x: 50, y: 80 },  // FWD
    { x: 30, y: 20 },  // Additional positions if needed
    { x: 70, y: 20 },
    { x: 30, y: 70 },
    { x: 70, y: 70 }
  ];
  
  // Assign a position to each on-field player
  onFieldPlayers.forEach((player, index) => {
    const playerIndex = updatedPlayers.findIndex(p => p.id === player.id);
    if (playerIndex !== -1) {
      // Check if we have a predefined position for this index
      if (index < defaultPositions.length) {
        // Ensure position is properly typed as Position
        updatedPlayers[playerIndex] = {
          ...updatedPlayers[playerIndex],
          position: defaultPositions[index]
        };
      } else {
        // Use a fallback position if we have more players than positions
        updatedPlayers[playerIndex] = {
          ...updatedPlayers[playerIndex],
          position: { x: Math.random() * 100, y: Math.random() * 100 }
        };
      }
    }
  });
  
  return updatedPlayers;
}