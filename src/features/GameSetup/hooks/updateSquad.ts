/**
 * Retrieves the players array from the selected squad.
 *
 * @param selectedSquad - The squad object.
 * @returns Array of players or an empty array if no players found.
 */
export function getSquadPlayers(selectedSquad: { players?: any[] }): any[] {
  return selectedSquad && selectedSquad.players ? selectedSquad.players : [];
}

/**
 * Updates the selected squad with a new players list and persists the updated squad in localStorage.
 *
 * @param selectedSquad - The current squad object.
 * @param updatedSquadPlayers - Array of updated player names or objects.
 * @param setSelectedSquad - State setter function to update the selected squad.
 */
export function updateSquad(
  selectedSquad: any,
  updatedSquadPlayers: any[],
  setSelectedSquad: (squad: any) => void
): void {
  if (selectedSquad) {
    const updatedSquad = { ...selectedSquad, players: updatedSquadPlayers };
    setSelectedSquad(updatedSquad);
    localStorage.setItem('selectedSquad', JSON.stringify(updatedSquad));
  }
}