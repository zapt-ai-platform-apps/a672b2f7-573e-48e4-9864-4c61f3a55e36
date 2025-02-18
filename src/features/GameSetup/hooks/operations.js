/**
 * Adds a new player to the starting players list.
 * @param {string} playerName - The name of the player to add.
 * @param {Function} setStartingPlayers - State setter for the starting players list.
 * @param {Function} setPlayerName - State setter for the player name input.
 */
export function addPlayer(playerName, setStartingPlayers, setPlayerName) {
  if (!playerName.trim()) return;
  const newPlayer = {
    id: Date.now(), // simple unique id using timestamp
    name: playerName.trim(),
    isStartingPlayer: false
  };
  setStartingPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  setPlayerName('');
}

/**
 * Deletes a player from the starting players list.
 * @param {number|string} playerId - The ID of the player to delete.
 * @param {Function} setStartingPlayers - State setter for the starting players list.
 */
export function deletePlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
}

/**
 * Toggles the starting status of a player.
 * @param {number|string} playerId - The ID of the player to toggle.
 * @param {Function} setStartingPlayers - State setter for the starting players list.
 */
export function toggleStartingPlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prevPlayers =>
    prevPlayers.map(player =>
      player.id === playerId ? { ...player, isStartingPlayer: !player.isStartingPlayer } : player
    )
  );
}

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
    return;
  }
  if (startingPlayers.length === 0) {
    setErrorMessage('At least one starting player must be selected.');
    return;
  }
  // Additional validations can be added as needed.
  contextHandleStartGame(goalkeeper, startingPlayers, includeGKPlaytime);
}