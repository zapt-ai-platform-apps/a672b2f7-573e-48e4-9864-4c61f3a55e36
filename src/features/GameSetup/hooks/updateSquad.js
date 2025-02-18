/**
 * Retrieves the players array from the selected squad.
 *
 * @param {Object} selectedSquad - The squad object.
 * @returns {Array} Array of players or an empty array if no players found.
 */
export function getSquadPlayers(selectedSquad) {
  return selectedSquad && selectedSquad.players ? selectedSquad.players : [];
}

/**
 * Updates the selected squad with a new players list and persists the updated squad in localStorage.
 *
 * @param {Object} selectedSquad - The current squad object.
 * @param {Array} updatedSquadPlayers - Array of updated player names or objects.
 * @param {Function} setSelectedSquad - State setter function to update the selected squad.
 */
export function updateSquad(selectedSquad, updatedSquadPlayers, setSelectedSquad) {
  if (selectedSquad) {
    const updatedSquad = { ...selectedSquad, players: updatedSquadPlayers };
    setSelectedSquad(updatedSquad);
    localStorage.setItem('selectedSquad', JSON.stringify(updatedSquad));
  }
}