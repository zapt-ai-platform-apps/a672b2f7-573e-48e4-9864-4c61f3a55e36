import { Player } from '../../../types/GameTypes';

export function addPlayerToList(players: Player[], name: string): Player[] {
  const newPlayer: Player = {
    id: Date.now() + Math.random(),
    name,
    isStartingPlayer: false
  };
  return [...players, newPlayer];
}

export function removePlayerFromList(players: Player[], playerId: number | string): Player[] {
  return players.filter(player => player.id !== playerId);
}

export function togglePlayerInList(players: Player[], playerId: number | string): Player[] {
  return players.map(player =>
    player.id === playerId ? { ...player, isStartingPlayer: !player.isStartingPlayer } : player
  );
}