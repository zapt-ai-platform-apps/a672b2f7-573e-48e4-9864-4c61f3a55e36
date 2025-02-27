import { createPlayer } from '../../../shared/models/player';
import type { Player } from '../../../types/GameTypes';

export function addPlayer(
  playerName: string,
  setStartingPlayers: (update: (prev: Player[]) => Player[]) => void,
  setPlayerName: (name: string) => void
): void {
  if (playerName.trim() !== '') {
    setStartingPlayers((prev) => {
      const player = createPlayer({ name: playerName.trim() });
      const newPlayer = {
        ...player,
        isStartingPlayer: true,
        isInMatchSquad: true,
        isInStartingLineup: false // Add missing property
      };
      return [...prev, newPlayer];
    });
    setPlayerName('');
  }
}