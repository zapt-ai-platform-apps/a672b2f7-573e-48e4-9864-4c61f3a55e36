import { Player } from '../../../types/GameTypes';

function parsePlayers(text: string): Player[] {
  const lines = text.split('\n');
  return lines.reduce((acc: Player[], line, index) => {
    const trimmed = line.trim();
    if (trimmed) {
      const player: Player = {
        id: Date.now() + index,
        name: trimmed,
        isStartingPlayer: false
      };
      acc.push(player);
    }
    return acc;
  }, []);
}

export default parsePlayers;