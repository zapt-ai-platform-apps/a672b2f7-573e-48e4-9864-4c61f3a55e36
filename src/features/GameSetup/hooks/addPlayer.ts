import { createPlayer } from '../../../shared/models/player';

export function addPlayer(
  playerName: string,
  setStartingPlayers: (update: (prev: any[]) => any[]) => void,
  setPlayerName: (name: string) => void
): void {
  if (playerName.trim() !== '') {
    setStartingPlayers((prev) => {
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