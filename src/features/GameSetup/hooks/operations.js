/**
 * Validates game setup parameters and triggers game start.
 * @param {string} goalkeeper - The name of the selected goalkeeper.
 * @param {Array} startingPlayers - Array of starting player objects.
 * @param {boolean} includeGKPlaytime - Flag indicating if goalkeeper playtime is included.
 * @param {Function} setErrorMessage - State setter for error messages.
 * @param {Function} contextHandleStartGame - Context handler to start the game.
 */
export function handleStartGameWrapper(goalkeeper, startingPlayers, includeGKPlaytime, setErrorMessage, contextHandleStartGame) {
  if (!goalkeeper) {
    setErrorMessage('Goalkeeper must be selected.');
    return false;
  }
  if (startingPlayers.length === 0) {
    setErrorMessage('At least one starting player must be selected.');
    return false;
  }
  
  try {
    contextHandleStartGame(startingPlayers, goalkeeper, includeGKPlaytime);
    return true;
  } catch (error) {
    setErrorMessage(error.message);
    return false;
  }
}