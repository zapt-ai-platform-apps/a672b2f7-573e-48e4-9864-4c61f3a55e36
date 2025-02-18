/**
 * Deletes a player from the starting players list based on their identifier.
 *
 * @param {string} playerId - The unique identifier of the player to delete.
 * @param {Function} setStartingPlayers - The state setter function for the starting players array.
 */
export function deletePlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
}

/**
 * Toggles the starting status of a given player in the starting players list.
 * If toggling on and the player is not part of the match squad, the player is automatically added to it.
 *
 * @param {string} playerId - The unique identifier of the player.
 * @param {Function} setStartingPlayers - The state setter function for updating the starting players list.
 */
export function toggleStartingPlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev => {
    console.log("Toggling starting status for player:", playerId);
    return prev.map(player => {
      if (String(player.id) === String(playerId)) {
        const newStartingStatus = !player.isStartingPlayer;
        if (newStartingStatus && !player.isInMatchSquad) {
          return { ...player, isStartingPlayer: true, isInMatchSquad: true };
        }
        return { ...player, isStartingPlayer: newStartingStatus };
      }
      return player;
    });
  });
}