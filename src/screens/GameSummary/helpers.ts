import { Player } from '../../types/GameTypes';

export function getPlayersWithDefaults(players: Player[]): Player[] {
  return players.map(player => ({
    ...player,
    name: player.name || 'Unknown Player'
  }));
}