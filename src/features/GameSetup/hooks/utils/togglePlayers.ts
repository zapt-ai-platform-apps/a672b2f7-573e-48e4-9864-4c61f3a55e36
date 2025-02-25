import { Player } from '../../../../types/GameTypes';

export function toggleMatchPlayerHelper(players: Player[], playerId: string): Player[] {
  return players.map(player => {
    if (player.id === playerId) {
      return {
        ...player,
        isInMatchSquad: !player.isInMatchSquad
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