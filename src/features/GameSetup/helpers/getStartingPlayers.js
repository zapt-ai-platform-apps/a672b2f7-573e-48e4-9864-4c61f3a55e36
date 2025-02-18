import { parsePlayers } from '../../../utils/parsePlayers.js';

/**
 * Gets starting players from squad data ensuring they are in the match squad.
 *
 * @param {Object} selectedSquad - The selected squad with players.
 * @param {Array} matchSquad - Array of player objects in the match squad.
 * @returns {Array} Array of player objects with starting status set.
 */
function getStartingPlayers(selectedSquad, matchSquad) {
  let playersArr = [];
  if (selectedSquad?.players) {
    playersArr = parsePlayers(selectedSquad.players).map((player, index) => ({
      id: index + 1,
      name: typeof player === 'string' ? player : player.name,
      isStartingPlayer: true,
      isInMatchSquad: true
    }));
  } else if (matchSquad && matchSquad.length > 0) {
    playersArr = matchSquad.map((player) => ({
      id: player.id,
      name: player.name,
      isStartingPlayer: true,
      isInMatchSquad: true
    }));
  }
  return playersArr;
}

export default getStartingPlayers;