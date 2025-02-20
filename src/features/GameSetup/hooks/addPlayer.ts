import { createPlayer } from '../../../shared/models/player';

/**
 * Adds a new player to the starting players list if the given name is not empty.
 *
 * @param playerName - The name of the player to be added.
 * @param setStartingPlayers - The state setter function for updating the starting players array.
 * @param setPlayerName - The state setter function for clearing or updating the player name input.
 */
export function addPlayer(
  playerName: string,
  setStartingPlayers: (players: any[]) => void,
  setPlayerName: (name: string) => void
): void {
  if (playerName.trim() !== '') {
    setStartingPlayers(prev => {
      const player = createPlayer({ name: playerName.trim() });
      const newPlayer = {
        ...player,
        isStartingPlayer: true,
        isInMatchSquad: true
      };
      return [...prev, newPlayer];
    });
    setPlayerName('');
  }
}