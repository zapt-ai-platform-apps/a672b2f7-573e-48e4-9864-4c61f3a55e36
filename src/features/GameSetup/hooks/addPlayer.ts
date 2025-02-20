import { createPlayer } from '../../../shared/models/player';
import { Dispatch, SetStateAction } from 'react';

export function addPlayer(
  playerName: string,
  setStartingPlayers: Dispatch<SetStateAction<any[]>>,
  setPlayerName: Dispatch<SetStateAction<string>>
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