export interface SquadPlayer {
  id: string;
  name: string;
  [key: string]: any;
}

export function normalizePlayers(players: (string | SquadPlayer)[]): SquadPlayer[] {
  return players.map((player) => {
    if (typeof player === 'string') {
      return { id: Date.now().toString() + Math.random(), name: player };
    }
    return player;
  });
}