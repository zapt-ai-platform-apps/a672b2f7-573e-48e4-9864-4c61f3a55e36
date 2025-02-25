import { Player } from '../../../types/GameTypes';

export function addPlayerToList(players: Player[], name: string): Player[] {
  return [
    ...players,
    { 
      id: String(Date.now()), 
      name, 
      isStartingPlayer: true,
      totalPlayTime: 0,
      isOnField: false,
      isGoalkeeper: false,
      position: { x: 0, y: 0 }
    }
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