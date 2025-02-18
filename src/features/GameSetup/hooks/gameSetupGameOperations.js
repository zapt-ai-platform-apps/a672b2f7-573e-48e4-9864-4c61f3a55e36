/**
 * @typedef {Object} Player
 * @property {number} id - The unique identifier of the player.
 * @property {string} name - The name of the player.
 * @property {boolean} isStartingPlayer - Indicates if the player is selected as a starting player.
 */

/**
 * Validates game start conditions and calls the context-provided start game function if valid.
 * Sets an error message if no goalkeeper is selected or if no player is marked as a starter.
 *
 * @param {any} goalkeeper - The selected goalkeeper for the game.
 * @param {Player[]} startingPlayers - An array of player objects representing the starting players.
 * @param {boolean} includeGKPlaytime - Flag indicating whether to include goalkeeper playtime.
 * @param {function} setErrorMessage - Function to update the error message state.
 * @param {function} contextHandleStartGame - The context function to start the game; invoked with the list of starting players, goalkeeper, and includeGKPlaytime flag.
 */
export function handleStartGameWrapper(goalkeeper, startingPlayers, includeGKPlaytime, setErrorMessage, contextHandleStartGame) {
  if (!goalkeeper) {
    setErrorMessage('Please select a goalkeeper');
    return;
  }
  const playersToStart = startingPlayers.filter(player => player.isStartingPlayer);
  if (playersToStart.length === 0) {
    setErrorMessage('At least one player must be selected as starter');
    return;
  }
  contextHandleStartGame(playersToStart, goalkeeper, includeGKPlaytime);
}