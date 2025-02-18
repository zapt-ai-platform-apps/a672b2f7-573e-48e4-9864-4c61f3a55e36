/**
 * Generates a unique ID for a player.
 * @returns {string} A unique player ID.
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Creates a new player object with clearly defined properties.
 *
 * @param {Object} params - Parameters for player creation.
 * @param {string} params.name - The player's name.
 * @returns {Object} The new player object with defined model properties.
 */
export function createPlayer({ name }) {
  return {
    id: generateId(),
    name,
    isInMatchSquad: false,      // Indicates if the player is part of the match squad
    isStartingPlayer: false     // Indicates if the player is in the starting lineup
  };
}

/**
 * Updates a player's status with business rule validation.
 *
 * @param {Object} player - The original player object.
 * @param {Object} updates - An object containing properties to update.
 * @returns {Object} The updated player object.
 * @throws {Error} Throws an error if the update violates business rules.
 */
export function updatePlayerStatus(player, updates) {
  const updatedPlayer = { ...player, ...updates };

  if (updatedPlayer.isStartingPlayer && !updatedPlayer.isInMatchSquad) {
    throw new Error('Player cannot be in starting lineup if not in match squad');
  }

  return updatedPlayer;
}