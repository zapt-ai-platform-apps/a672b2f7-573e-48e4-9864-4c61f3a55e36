/**
 * @typedef {Object} Player
 * @property {number|string} id - Unique identifier of the player.
 * @property {string} name - Name of the player.
 * @property {boolean} [isStartingPlayer] - Indicates if the player is a starting player.
 */

/**
 * @typedef {Object} Squad
 * @property {Array<Player>} players - Array of player objects.
 */

/**
 * Processes the selected squad to extract the starting players with default starting status.
 * @param {Squad} selectedSquad - The selected squad object.
 * @param {any} [matchSquad] - (Optional) The match squad data.
 * @returns {Array<Player>} Array of starting players.
 */
export function getStartingPlayers(selectedSquad, matchSquad) {
  if (selectedSquad && selectedSquad.players) {
    return selectedSquad.players.map(player => ({
      ...player,
      isStartingPlayer: player.isStartingPlayer !== undefined ? player.isStartingPlayer : false
    }));
  }
  return [];
}