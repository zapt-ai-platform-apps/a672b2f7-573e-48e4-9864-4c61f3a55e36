import { Player } from '../../../types/GameTypes';

function parsePlayers(text: string): Player[] {
  const lines = text.split('\n');
  return lines.reduce((acc: Player[], line, index) => {
    const trimmed = line.trim();
    if (trimmed) {
      const player: Player = {
        id: String(Date.now() + index),
        name: trimmed,
        isStartingPlayer: false,
        totalPlayTime: 0,
        isOnField: false,
        isGoalkeeper: false,
        position: { x: 0, y: 0 }
      };
      acc.push(player);
    }
    return acc;
  }, []);
}

export default parsePlayers;