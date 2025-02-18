/**
 * Service hooks for squad management, wrapping API calls.
 *
 * @module useSquadManagementService
 */
import { fetchSquadsAPI, createSquadAPI, updateSquadAPI } from '../api/squadService.js';

export async function fetchSquads() {
  return await fetchSquadsAPI();
}

export async function createSquad(squadName, squadPlayers) {
  return await createSquadAPI(squadName, squadPlayers);
}

export async function updateSquad(squadId, squadName, squadPlayers) {
  return await updateSquadAPI(squadId, squadName, squadPlayers);
}