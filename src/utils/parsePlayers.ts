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

  // Handle string input
  if (!input || typeof input !== 'string') return [];
  
  const text = input.trim();
  if (!text) return [];
  
  // Log for debugging
  console.log('Parsing players from string:', text);
  
  // First check if it's a JSON string
  try {
    if (text.startsWith('[') && text.endsWith(']')) {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed.map((name, index) => ({
          id: String(index),
          name: typeof name === 'string' ? name : String(name),
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
    }
  } catch (e) {
    console.log('Not valid JSON, trying other formats');
  }
  
  // Determine if we should split by commas or newlines
  const hasNewlines = text.includes('\n');
  const hasCommas = text.includes(',');
  
  // If there are commas but no newlines, split by commas
  const delimiter = (hasCommas) ? ',' : '\n';
  
  // Split the string and create player objects
  const playerNames = text
    .split(delimiter)
    .map(name => name.trim())
    .filter(name => name.length > 0);
  
  console.log('Parsed player names:', playerNames);
  
  return playerNames.map((name, index) => ({ 
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