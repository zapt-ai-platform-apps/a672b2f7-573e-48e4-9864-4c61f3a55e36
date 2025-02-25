import { Player } from '../../../types/GameTypes';

function parsePlayers(text: string): Player[] {
  return text
    .split('\n')
    .map(name => name.trim())
    .filter(name => name !== '')
    .map(name => ({
      id: Date.now() + Math.random(),
      name,
      isStartingPlayer: false
    }));
}

export default parsePlayers;