import { parsePlayers } from '../../../utils/parsePlayers.js';

function getStartingPlayers(selectedSquad, matchSquad) {
  let playersArr = [];
  if (selectedSquad?.players) {
    playersArr = parsePlayers(selectedSquad.players).map((player, index) => ({
      id: index + 1,
      name: typeof player === 'string' ? player : player.name,
      isStartingPlayer: true
    }));
  } else if (matchSquad && matchSquad.length > 0) {
    playersArr = matchSquad.map((player) => ({
      id: player.id,
      name: player.name,
      isStartingPlayer: true
    }));
  }
  return playersArr;
}

export default getStartingPlayers;