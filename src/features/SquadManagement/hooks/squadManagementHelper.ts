import { parsePlayers } from '../../../utils/parsePlayers';

export function processSquads(fetchedSquads: any[]): any[] {
  return fetchedSquads.map(squad => ({
    ...squad,
    players:
      typeof squad.players === 'string'
        ? parsePlayers(squad.players)
        : squad.players
  }));
}

export function processSquad(squad: any): any {
  return {
    ...squad,
    players:
      typeof squad.players === 'string'
        ? parsePlayers(squad.players)
        : squad.players
  };
}

export function createPlayerObjects(squadPlayersList: string[]): any[] {
  return squadPlayersList.map(name => ({
    id: Date.now().toString() + Math.random().toString().slice(2, 8),
    name,
    isOnField: false,
    isGoalkeeper: false,
    isStartingPlayer: false,
    position: { x: 0, y: 0 },
    totalPlayTime: 0
  }));
}