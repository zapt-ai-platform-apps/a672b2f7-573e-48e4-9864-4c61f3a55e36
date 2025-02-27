import { createPlayer } from '../../../shared/models/player';
import type { Player } from '../../../types/GameTypes';

export function addPlayer(
  playerName: string,
  setStartingPlayers: (update: (prev: Player[]) => Player[]) => void,
  setPlayerName: (name: string) => void
): void {
  if (playerName.trim() !== '') {
    setStartingPlayers((prev: Player[]) => {
      const player = createPlayer({ name: playerName.trim() });
      // Fix: Ensure the returned object matches Player type exactly
      const newPlayer: Player = {
        ...player,
        isStartingPlayer: true,
        isInMatchSquad: true,
        isInStartingLineup: true
      };
      return [...prev, newPlayer];
    });
    setPlayerName('');
  }
}