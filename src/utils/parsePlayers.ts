import { Player } from '../types/GameTypes';

export default function parsePlayers(text: string): Player[] {
  if (!text) return [];
  
  // Determine if we should split by commas or newlines
  const hasNewlines = text.includes('\n');
  const hasCommas = text.includes(',');
  
  // If there are commas but no newlines, split by commas
  const delimiter = (hasCommas && !hasNewlines) ? ',' : '\n';
  
  return text
    .split(delimiter)
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