/**
 * @typedef {Object} Player
 * @property {boolean} isOnField - Indicates if the player is on the field.
 */

/**
 * Processes the player list by partitioning players into on-field and off-field groups.
 * @param {Array<Player>} playerData - Array of player objects.
 * @param {boolean} includeGKPlaytime - (Unused parameter, kept for compatibility)
 * @param {boolean} isRunning - (Unused parameter, kept for compatibility)
 * @returns {{onField: Array<Player>, offField: Array<Player>}} Object with player arrays.
 */
export function processPlayerLists(playerData, includeGKPlaytime, isRunning) {
  const onField = playerData.filter(player => player.isOnField);
  const offField = playerData.filter(player => !player.isOnField);
  return { onField, offField };
}