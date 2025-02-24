import { Squad } from './useSquadManagementTypes';

let squads: Squad[] = [];

export async function fetchSquads(): Promise<Squad[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...squads]);
    }, 100);
  });
}

export async function createSquad(name: string, players: string[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSquad: Squad = {
        id: Date.now().toString(),
        name,
        players
      };
      squads.push(newSquad);
      resolve();
    }, 100);
  });
}

export async function updateSquad(id: string, name: string, players: string[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      squads = squads.map((squad) => {
        if (squad.id === id) {
          return { ...squad, name, players };
        }
        return squad;
      });
      resolve();
    }, 100);
  });
}