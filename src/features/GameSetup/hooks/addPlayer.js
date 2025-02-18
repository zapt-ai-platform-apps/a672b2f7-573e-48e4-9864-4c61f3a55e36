import { createPlayer } from '../../../shared/models/player';

/**
 * @typedef {Object} Player
 * @property {string} id - The unique identifier of the player.
 * @property {string} name - The name of the player.
 * @property {boolean} isStartingPlayer - Indicates if the player is selected as a starting player.
 * @property {boolean} isInMatchSquad - Indicates if the player is part of the match squad.
 */

/**
 * Adds a new player to the starting players list if the given name is not empty.
 *
 * @param {string} playerName - The name of the player to be added.
 * @param {Function} setStartingPlayers - The state setter function for updating the starting players array.
 * @param {Function} setPlayerName - The state setter function for clearing or updating the player name input.
 */
export function addPlayer(playerName, setStartingPlayers, setPlayerName) {
  if (playerName.trim() !== '') {
    setStartingPlayers(prev => {
      const player = createPlayer({ name: playerName.trim() });
      const newPlayer = {
        ...player,
        isStartingPlayer: true,
        isInMatchSquad: true
      };
      return [...prev, newPlayer];
    });
    setPlayerName('');
  }
}