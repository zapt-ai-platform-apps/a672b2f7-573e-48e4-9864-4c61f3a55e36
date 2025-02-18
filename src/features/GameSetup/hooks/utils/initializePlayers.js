import { parsePlayers } from '../../../utils/parsePlayers.js';

function initializePlayers(selectedSquad) {
  if (selectedSquad && selectedSquad.players) {
    const playersArray = Array.isArray(selectedSquad.players)
      ? selectedSquad.players
      : parsePlayers(selectedSquad.players);
    return playersArray.map((player, index) => ({
      id: player && player.id ? player.id : index + 1,
      name: typeof player === 'string' ? player : player.name,
      isInMatchSquad: true,
      isStartingPlayer: true
    }));
  }
  return [];
}

export default initializePlayers;