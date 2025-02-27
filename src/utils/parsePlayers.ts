import { Player, Position } from '../types/GameTypes';
import { parsePlayers as parsePlayersToArray } from '../utils/playerParsingUtils';

/**
 * Parses player data from various formats into structured Player objects
 * 
 * @param input - Player data as string or array
 * @returns Array of Player objects
 */
export default function parsePlayers(input: string | any[]): Player[] {
  console.log('parsePlayers util - input type:', typeof input);
  
  // Handle array input
  if (Array.isArray(input)) {
    console.log('parsePlayers util - processing array input');
    return input.map((player, index) => {
      // If this is already a Player object with all required properties
      if (typeof player === 'object' && player !== null && 
          'id' in player && 'name' in player && 'position' in player) {
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
      } else {
        // If it's a simple string or partial object, create a minimal Player object
        const playerName = typeof player === 'string' ? 
          player : 
          (player && typeof player === 'object' && 'name' in player ? 
            String(player.name) : 
            `Player ${index + 1}`);
        
        return {
          id: String(index),
          name: playerName,
          isStartingPlayer: false,
          totalPlayTime: 0,
          isOnField: false,
          isGoalkeeper: false,
          position: { x: 0, y: 0 },
          isInMatchSquad: false,
          isInStartingLineup: false,
          playIntervals: []
        };
      }
    });
  }

  // Handle string input by first parsing to string array
  const playerNames = parsePlayersToArray(input, 'parsePlayers-util');
  console.log('parsePlayers util - parsed player names:', playerNames);
  
  // Convert string array to Player objects
  return playerNames.map((name, index) => ({ 
    id: String(index), 
    name, 
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

/**
 * Gets the count of players in a squad, handling different data formats
 */
export function getPlayerCount(squadData: any): number {
  if (!squadData || !squadData.players) return 0;
  
  const { players } = squadData;
  
  if (Array.isArray(players)) {
    return players.length;
  }
  
  if (typeof players === 'string') {
    // Parse the string to get the actual player count
    return parsePlayersToArray(players, 'getPlayerCount').length;
  }
  
  return 0;
}