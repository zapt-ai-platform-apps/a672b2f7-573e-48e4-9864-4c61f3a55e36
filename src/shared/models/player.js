/**
 * @typedef {Object} PlayerInput
 * @property {string} name - The name of the player.
 * @property {boolean} isInMatchSquad - Whether the player is in the match squad.
 * @property {boolean} isInStartingLineup - Whether the player is in the starting lineup.
 */

/**
 * @typedef {Object} Player
 * @property {number|string} id - Unique identifier.
 * @property {string} name - The name of the player.
 * @property {boolean} isInMatchSquad - Whether the player is in the match squad.
 * @property {boolean} isInStartingLineup - Whether the player is in the starting lineup.
 * @property {number} playTime - Total play time.
 * @property {string} position - The position on the field.
 */

/**
 * Creates a new player object.
 * @param {PlayerInput} param0 - Player input data.
 * @returns {Player} The newly created player object.
 */
export function createPlayer({ name, isInMatchSquad, isInStartingLineup }) {
  return {
    id: Date.now() + Math.random(),
    name,
    isInMatchSquad,
    isInStartingLineup,
    playTime: 0,
    position: 'field'
  };
}