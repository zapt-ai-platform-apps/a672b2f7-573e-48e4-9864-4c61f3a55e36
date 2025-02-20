/**
 * Validates game start conditions and calls the context-provided start game function if valid.
 * Sets an error message if no goalkeeper is selected or if no player is marked as a starter.
 *
 * @param goalkeeper - The selected goalkeeper for the game.
 * @param startingPlayers - An array of player objects representing the starting players.
 * @param includeGKPlaytime - Flag indicating whether to include goalkeeper playtime.
 * @param setErrorMessage - Function to update the error message state.
 * @param contextHandleStartGame - The context function to start the game; invoked with the list of starting players, goalkeeper, and includeGKPlaytime flag.
 * @returns Returns true if validation passed and game was started, false otherwise.
 */
export function handleStartGameWrapper(
  goalkeeper: any,
  startingPlayers: { id: number; name: string; isStartingPlayer: boolean }[],
  includeGKPlaytime: boolean,
  setErrorMessage: (msg: string) => void,
  contextHandleStartGame: (players: any[], goalkeeper: any, includeGKPlaytime: boolean) => void
): boolean {
  if (!goalkeeper) {
    setErrorMessage('Please select a goalkeeper');
    return false;
  }
  
  const playersToStart = startingPlayers.filter(player => player.isStartingPlayer);
  if (playersToStart.length === 0) {
    setErrorMessage('At least one player must be selected as starter');
    return false;
  }

  contextHandleStartGame(playersToStart, goalkeeper, includeGKPlaytime);
  return true;
}