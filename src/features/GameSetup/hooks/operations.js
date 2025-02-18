import { createPlayer } from '../../../shared/models/player.js';

/**
 * Adds a new player using the shared player model.
 * @param {string} playerName - The name of the player to add.
 * @param {function} setStartingPlayers - State setter for the starting players array.
 * @param {function} setPlayerName - State setter for resetting the input field.
 */
function addPlayer(playerName, setStartingPlayers, setPlayerName) {
  if (!playerName) return;
  const newPlayer = createPlayer({ name: playerName });
  setStartingPlayers(prev => [...prev, newPlayer]);
  setPlayerName('');
}

/**
 * Deletes a player from the starting players list.
 * @param {string} playerId - The ID of the player to delete.
 * @param {function} setStartingPlayers - State setter for the starting players array.
 */
function deletePlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
}

/**
 * Toggles a player's starting status.
 * @param {string} playerId - The ID of the player to toggle.
 * @param {function} setStartingPlayers - State setter for the starting players array.
 */
function toggleStartingPlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev =>
    prev.map(player =>
      player.id === playerId
        ? { ...player, isStartingPlayer: !player.isStartingPlayer }
        : player
    )
  );
}

/**
 * Validates the game setup and triggers the start game process.
 * @param {Object} goalkeeper - The selected goalkeeper object.
 * @param {Array} startingPlayers - The array of starting players.
 * @param {boolean} includeGKPlaytime - Flag to include goalkeeper playtime.
 * @param {function} setErrorMessage - Function to set an error message.
 * @param {function} contextHandleStartGame - Function to handle starting the game.
 */
function handleStartGameWrapper(goalkeeper, startingPlayers, includeGKPlaytime, setErrorMessage, contextHandleStartGame) {
  if (!goalkeeper) {
    setErrorMessage("Please select a goalkeeper.");
    return;
  }
  if (startingPlayers.length < 1) {
    setErrorMessage("Not enough players.");
    return;
  }
  setErrorMessage('');
  contextHandleStartGame({ goalkeeper, startingPlayers, includeGKPlaytime });
}

export { addPlayer, deletePlayer, toggleStartingPlayer, handleStartGameWrapper };