import { addPlayer } from './addPlayer';
import { deletePlayer, toggleStartingPlayer } from './playerStatusOperations';
import { handleStartGameWrapper } from './gameSetupGameOperations';

/**
 * Updates a player's selection status in the game setup
 * @param playerId - The ID of the player to update
 * @param isSelected - Whether the player is selected or not
 * @returns An action object to update the player selection
 */
export function updatePlayerSelection(playerId: number, isSelected: boolean) {
  return {
    type: 'UPDATE_PLAYER_SELECTION',
    payload: {
      playerId,
      isSelected
    }
  };
}

export {
  addPlayer,
  deletePlayer,
  toggleStartingPlayer,
  handleStartGameWrapper
};