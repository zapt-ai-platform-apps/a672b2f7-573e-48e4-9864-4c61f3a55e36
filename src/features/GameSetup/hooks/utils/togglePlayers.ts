import { Player } from '../../../../types/GameTypes';

export function toggleMatchPlayerHelper(players: Player[], playerId: string): Player[] {
  return players.map(player => {
    if (player.id === playerId) {
      return {
        ...player,
        isInMatch: !player.isInMatch
      };
    }
    return player;
  });
}

export function toggleStartingPlayerHelper(players: Player[], playerId: string): Player[] {
  return players.map(player => {
    if (player.id === playerId) {
      return {
        ...player,
        isStartingPlayer: !player.isStartingPlayer
      };
    }
    return player;
  });
}