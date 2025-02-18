/**
 * @typedef {Object} Player
 * @property {number} id - The unique identifier of the player.
 * @property {string} name - The name of the player.
 * @property {boolean} isStartingPlayer - Indicates if the player is selected as a starting player.
 */

/**
 * Adds a new player to the starting players list if the given name is not empty.
 *
 * @param {string} playerName - The name of the player to be added.
 * @param {function} setStartingPlayers - The state setter function for updating the starting players array.
 * @param {function} setPlayerName - The state setter function for clearing or updating the player name input.
 */
export function addPlayer(playerName, setStartingPlayers, setPlayerName) {
  if (playerName.trim() !== '') {
    setStartingPlayers(prev => {
      const newPlayer = {
        id: prev.length + 1,
        name: playerName.trim(),
        isStartingPlayer: true
      };
      return [...prev, newPlayer];
    });
    setPlayerName('');
  }
}

/**
 * Deletes a player from the starting players list based on their identifier.
 *
 * @param {number} playerId - The unique identifier of the player to delete.
 * @param {function} setStartingPlayers - The state setter function for the starting players array.
 */
export function deletePlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev => prev.filter(player => player.id !== playerId));
}

/**
 * Toggles the starting status of a given player in the starting players list.
 *
 * @param {number} playerId - The unique identifier of the player.
 * @param {function} setStartingPlayers - The state setter function for updating the starting players list.
 */
export function toggleStartingPlayer(playerId, setStartingPlayers) {
  setStartingPlayers(prev =>
    prev.map(player =>
      player.id === playerId
        ? { ...player, isStartingPlayer: !player.isStartingPlayer }
        : player
    )
  );
}