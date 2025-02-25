import { Player } from '../../../../types/GameTypes';

function createPlayer(name: string): Player {
  return {
    id: String(Date.now() + Math.random()), // Convert to string to match expected type
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
  return players.filter(player => String(player.id) !== String(playerId));
}

export function togglePlayerInList(players: Player[], playerId: number | string): Player[] {
  return players.map(player => {
    if (String(player.id) === String(playerId)) {
      return { ...player, isStartingPlayer: !player.isStartingPlayer };
    }
    return player;
  });
}