import { addPlayer } from './addPlayer';
import { deletePlayer, toggleStartingPlayer } from './playerStatusOperations';
import { handleStartGameWrapper } from './gameSetupGameOperations';
import { Player } from '../../../types/GameTypes';

interface PlayerWithOptionalFields extends Player {
  selected?: boolean;
  status?: string;
}

/**
 * Updates a player's selection status in the game setup
 * @param players - List of players
 * @param playerId - The ID of the player to update
 * @returns Updated list of players with the selection toggled
 */
export function updatePlayerSelection(players: PlayerWithOptionalFields[], playerId: string): PlayerWithOptionalFields[] {
  return players.map(player => {
    if (player.id === playerId) {
      return { ...player, selected: !(player.selected ?? false) };
    }
    return player;
  });
}

/**
 * Updates the status of all players in the list
 * @param players - List of players
 * @param status - The status to set for all players
 * @returns Updated list of players with the new status
 */
export function updateAllPlayerStatus(players: PlayerWithOptionalFields[], status: string): PlayerWithOptionalFields[] {
  // Check if any player needs updating to avoid unnecessary object creation
  const needsUpdate = players.some(player => (player.status ?? '') !== status);
  
  if (!needsUpdate) {
    return players;
  }
  
  return players.map(player => {
    if ((player.status ?? '') !== status) {
      return { ...player, status };
    }
    return player;
  });
}

export {
  addPlayer,
  deletePlayer,
  toggleStartingPlayer,
  handleStartGameWrapper
};