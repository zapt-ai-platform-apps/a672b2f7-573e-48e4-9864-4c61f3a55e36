import { Player } from '../../../../types/GameTypes';

function createPlayer(name: string): Player {
  return {
    id: Date.now() + Math.random(),
    name: name.trim(),
    playIntervals: [],
    isOnField: true,
    isGoalkeeper: false,
    totalPlayTime: 0,
    position: { x: null, y: null },
    isStartingPlayer: true
  };
}

export function addPlayerToList(players: Player[], name: string): Player[] {
  if (name.trim() === "") return players;
  const newPlayer = createPlayer(name);
  return [...players, newPlayer];
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