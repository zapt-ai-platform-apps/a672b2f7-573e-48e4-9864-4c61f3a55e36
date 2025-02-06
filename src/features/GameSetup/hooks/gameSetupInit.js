import { parsePlayers } from '../../../lib/utils.js';

export function getInitialPlayers(selectedSquad) {
  if (selectedSquad?.players) {
    return Array.isArray(selectedSquad.players) 
      ? selectedSquad.players
      : parsePlayers(selectedSquad.players);
  }
  return [];
}