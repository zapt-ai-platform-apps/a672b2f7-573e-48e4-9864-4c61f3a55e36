import { fetchSquadsAPI, createSquadAPI, updateSquadAPI } from '../../../api/squadAPI';

export async function fetchSquads() {
  try {
    const data = await fetchSquadsAPI();
    return data;
  } catch (error) {
    console.error('Error fetching squads:', error);
    throw error;
  }
}

export async function createSquad(name, players) {
  try {
    const newSquad = await createSquadAPI(name, players);
    return newSquad;
  } catch (error) {
    console.error('Error creating squad:', error);
    throw error;
  }
}

export async function updateSquad(id, name, players) {
  try {
    const updatedSquad = await updateSquadAPI(id, name, players);
    return updatedSquad;
  } catch (error) {
    console.error('Error updating squad:', error);
    throw error;
  }
}