import parsePlayers from '../../../utils/parsePlayers';
import { Player } from '../../../types/GameTypes';

/**
 * Gets the player count for a squad
 * @param squad The squad object
 * @returns The number of players in the squad
 */
export function getSquadPlayerCount(squad: any): number {
  if (!squad) return 0;
  
  const { players } = squad;
  
  if (Array.isArray(players)) {
    return players.length;
  }
  
  if (typeof players === 'string') {
    // Parse the string to get the actual player count
    return parsePlayers(players).length;
  }
  
  return 0;
}

/**
 * Safely gets players from a squad object, handling both array and string formats
 * @param squad The squad object
 * @returns Array of player objects
 */
export function getSquadPlayers(squad: any): Player[] {
  if (!squad) return [];
  
  const { players } = squad;
  
  if (Array.isArray(players)) {
    return players;
  }
  
  if (typeof players === 'string') {
    return parsePlayers(players);
  }
  
  return [];
}

/**
 * Formats player data for display
 * @param players Array of player objects or player string
 * @returns Formatted player data for display
 */
export function formatPlayersForDisplay(players: Player[] | string): string {
  if (Array.isArray(players)) {
    return players.map(p => p.name).join(', ');
  }
  
  if (typeof players === 'string') {
    const parsedPlayers = parsePlayers(players);
    return parsedPlayers.map(p => p.name).join(', ');
  }
  
  return '';
}