import { Player } from '../../../types/GameTypes';

export function addPlayerToList(players: Player[], name: string): Player[] {
  return [
    ...players,
    { id: Date.now(), name, isStartingPlayer: true }
  ];
}

export function removePlayerFromList(players: Player[], playerId: number | string): Player[] {
  return players.filter(player => player.id !== playerId);
}

export function togglePlayerInList(players: Player[], playerId: number | string): Player[] {
  return players.map(player => {
    if (player.id === playerId) {
      return { ...player, isStartingPlayer: !player.isStartingPlayer };
    }
    return player;
  });
}