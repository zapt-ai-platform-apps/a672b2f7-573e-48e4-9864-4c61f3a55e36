import { Player } from '../types/GameTypes';

export default function parsePlayers(text: string): Player[] {
  return text
    .split('\n')
    .map((line, index) => {
      const trimmed = line.trim();
      if (trimmed) {
        return { id: index, name: trimmed, isStartingPlayer: false };
      }
      return null;
    })
    .filter((player): player is Player => player !== null);
}