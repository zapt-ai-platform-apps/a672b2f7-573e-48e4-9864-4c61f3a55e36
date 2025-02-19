/**
 * Processes the selected squad to extract the starting players with default starting status.
 * @param {Object} selectedSquad - The selected squad object.
 * @param {Object} matchSquad - (Optional) The match squad data.
 * @returns {Array} Array of starting players.
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