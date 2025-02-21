import { Squad } from './useSquadManagementTypes';

export async function fetchSquads(): Promise<Squad[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 500);
  });
}

export async function createSquad(name: string, players: string[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export async function updateSquad(id: number, name: string, players: string[]): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}