import { fetchSquadsAPI, createSquadAPI, updateSquadAPI } from '../api/squadService';

export async function fetchSquads(): Promise<any> {
  return await fetchSquadsAPI();
}

export async function createSquad(squadName: string, squadPlayers: any[]): Promise<any> {
  return await createSquadAPI(squadName, squadPlayers);
}

export async function updateSquad(squadId: string | number, squadName: string, squadPlayers: any[]): Promise<any> {
  return await updateSquadAPI(squadId, squadName, squadPlayers);
}