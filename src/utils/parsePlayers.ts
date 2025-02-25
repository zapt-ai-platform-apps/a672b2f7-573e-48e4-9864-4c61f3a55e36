import { Player } from '../types/GameTypes';

export default function parsePlayers(text: string): Player[] {
  if (!text) return [];
  
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map((name, index) => ({ 
      id: String(index), 
      name: name, 
      isStartingPlayer: false,
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      position: { x: 0, y: 0 }
    }));
}