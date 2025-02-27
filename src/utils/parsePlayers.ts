import { Player, Position } from '../types/GameTypes';

export default function parsePlayers(input: string | any[]): Player[] {
  // Handle array input
  if (Array.isArray(input)) {
    return input.map((player, index) => {
      // Create a base player object from the input
      const processedPlayer: Partial<Player> = {
        ...player,
        id: player.id || String(index),
        name: player.name || `Player ${index + 1}`,
        isStartingPlayer: player.isStartingPlayer || false,
        totalPlayTime: player.totalPlayTime || 0,
        isOnField: player.isOnField || false,
        isGoalkeeper: player.isGoalkeeper || false,
        isInMatchSquad: player.isInMatchSquad || false,
        isInStartingLineup: player.isInStartingLineup || false,
        playIntervals: player.playIntervals || []
      };

      // Ensure the position property is properly formatted
      if (!player.position || player.position === null) {
        processedPlayer.position = { x: 0, y: 0 };
      } else {
        // If position exists but contains string values, convert to numbers
        const position: Position = {
          x: typeof player.position.x === 'string' 
            ? parseFloat(player.position.x) 
            : (player.position.x || 0),
          y: typeof player.position.y === 'string'
            ? parseFloat(player.position.y)
            : (player.position.y || 0)
        };
        processedPlayer.position = position;
      }

      return processedPlayer as Player;
    });
  }

  // Handle string input (original functionality)
  if (!input) return [];
  
  // Determine if we should split by commas or newlines
  const text = input as string;
  const hasNewlines = text.includes('\n');
  const hasCommas = text.includes(',');
  
  // If there are commas but no newlines, split by commas
  const delimiter = (hasCommas && !hasNewlines) ? ',' : '\n';
  
  return text
    .split(delimiter)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map((name, index) => ({ 
      id: String(index), 
      name: name, 
      isStartingPlayer: false,
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      position: { x: 0, y: 0 },
      isInMatchSquad: false,
      isInStartingLineup: false,
      playIntervals: []
    }));
}