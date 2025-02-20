/**
 * Deletes a player from the starting players list based on their identifier.
 *
 * @param playerId - The unique identifier of the player to delete.
 * @param setStartingPlayers - The state setter function for the starting players array.
 */
export function deletePlayer(
  playerId: string | number,
  setStartingPlayers: (players: any[]) => void
): void {
  setStartingPlayers(prev => prev.filter((player: any) => player.id !== playerId));
}

/**
 * Toggles the starting status of a given player in the starting players list.
 * If toggling on and the player is not part of the match squad, the player is automatically added to it.
 *
 * @param playerId - The unique identifier of the player.
 * @param setStartingPlayers - The state setter function for updating the starting players list.
 */
export function toggleStartingPlayer(
  playerId: string | number,
  setStartingPlayers: (players: any[]) => void
): void {
  setStartingPlayers(prev => {
    console.log("Toggling starting status for player:", playerId);
    return prev.map((player: any) => {
      if (String(player.id) === String(playerId)) {
        const newStartingStatus = !player.isStartingLineup;
        if (newStartingStatus && !player.isInMatchSquad) {
          return { ...player, isStartingLineup: true, isInMatchSquad: true };
        }
        return { ...player, isStartingLineup: newStartingStatus };
      }
      return player;
    });
  });
}