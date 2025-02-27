import { Squad } from '../../../types/GameTypes';
import { ExtendedPlayer } from '../types/ExtendedPlayer';

/**
 * Initialize match squad players based on selected squad and existing match squad
 * @param selectedSquad The selected squad containing players
 * @param existingMatchSquad Optional existing match squad players
 * @returns Array of ExtendedPlayer with proper initialization
 */
export const initializeMatchSquadPlayers = (
  selectedSquad: Squad,
  existingMatchSquad?: ExtendedPlayer[]
): ExtendedPlayer[] => {
  if (!selectedSquad || !selectedSquad.players || !Array.isArray(selectedSquad.players)) {
    console.warn('Invalid selected squad data', selectedSquad);
    return [];
  }

  console.log('Initializing match squad players from:', selectedSquad.players);

  return selectedSquad.players.map(player => {
    if (!player || !player.id) {
      console.warn('Invalid player in squad:', player);
      return null;
    }
    
    // Check if player exists in the current match squad
    const existingPlayer = existingMatchSquad?.find(p => p.id === player.id);
    
    const extendedPlayer: ExtendedPlayer = {
      id: player.id,
      name: player.name || 'Unnamed Player',
      // Convert number to string if it's a number type
      number: player.number !== undefined ? String(player.number) : '',
      isInMatchSquad: existingPlayer ? existingPlayer.isInMatchSquad : false,
      totalPlayTime: player.totalPlayTime || 0,
      isOnField: player.isOnField || false,
      isGoalkeeper: player.isGoalkeeper || false,
      position: player.position || { x: 0, y: 0 },
      playIntervals: player.playIntervals || []
    };
    
    return extendedPlayer;
  }).filter(Boolean) as ExtendedPlayer[];
};