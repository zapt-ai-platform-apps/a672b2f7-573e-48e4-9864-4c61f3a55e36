import { Squad } from './useSquadManagementTypes';

let squadsDB: Squad[] = [];
let idCounter = 1;

export async function fetchSquads(): Promise<Squad[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...squadsDB]), 100);
  });
}

export async function createSquad(name: string, players: string[]): Promise<void> {
  return new Promise((resolve) => {
    const newSquad: Squad = {
      id: idCounter,
      name,
      players: [...players]
    };
    idCounter++;
    squadsDB.push(newSquad);
    setTimeout(resolve, 100);
  });
}

export async function updateSquad(id: number, name: string, players: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const index = squadsDB.findIndex(squad => squad.id === id);
    if (index === -1) {
      setTimeout(() => {
        reject(new Error("Squad not found"));
      }, 100);
    } else {
      squadsDB[index] = { ...squadsDB[index], name, players: [...players] };
      setTimeout(resolve, 100);
    }
  });
}