import { ExtendedPlayer } from '../types/ExtendedPlayer';
import { ensurePlayerProperties } from './ensurePlayerProperties';

/**
 * Initializes the match squad players with required properties.
 * 
 * @param players The players to initialize
 * @returns The initialized players with all required properties
 */
export function initializeMatchSquadPlayers(players: any[]): ExtendedPlayer[] {
  if (!players || !Array.isArray(players)) {
    return [];
  }
  
  return players.map(player => ensurePlayerProperties(player));
}