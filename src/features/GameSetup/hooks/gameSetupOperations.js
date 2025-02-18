/**
 * Game setup operations for managing player actions during game setup.
 * Provides functions for adding, deleting, toggling players, and handling game start.
 *
 * @module gameSetupOperations
 */
import { addPlayer as addPlayerOp } from './addPlayer.js';
import { deletePlayer as deletePlayerOp, toggleStartingPlayer as toggleStartingPlayerOp } from './playerStatusOperations.js';
import { handleStartGameWrapper } from './gameSetupGameOperations.js';

export {
  addPlayerOp as addPlayer,
  deletePlayerOp as deletePlayer,
  toggleStartingPlayerOp as toggleStartingPlayer,
  handleStartGameWrapper
};