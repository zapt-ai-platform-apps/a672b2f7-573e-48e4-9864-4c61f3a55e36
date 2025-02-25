import { Player } from '../types/GameTypes';

export default function parsePlayers(text: string): Player[] {
  return text
    .split('\n')
    .map((line, index) => {
      const trimmed = line.trim();
      if (trimmed) {
        return { 
          id: String(index), 
          name: trimmed, 
          isStartingPlayer: false,
          totalPlayTime: 0,
          isOnField: false,
          isGoalkeeper: false,
          position: { x: 0, y: 0 }
        };
      }
      return null;
    })
    .filter((player): player is Player => player !== null);
}