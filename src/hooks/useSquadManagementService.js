import * as Sentry from '@sentry/browser';
import { fetchSquadsAPI, createSquadAPI, updateSquadAPI } from '../api/squadAPI.js';

export async function fetchSquads() {
  try {
    const squads = await fetchSquadsAPI();
    console.log('Squads loaded:', squads);
    return squads;
  } catch (error) {
    console.error('Error loading squads:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function createSquad(squadName, squadPlayersList) {
  try {
    const newSquad = await createSquadAPI(squadName, squadPlayersList);
    console.log('Squad created:', newSquad);
    return newSquad;
  } catch (error) {
    console.error('Error creating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function updateSquad(squadId, squadName, squadPlayersList) {
  try {
    const updatedSquad = await updateSquadAPI(squadId, squadName, squadPlayersList);
    console.log('Squad updated:', updatedSquad);
    return updatedSquad;
  } catch (error) {
    console.error('Error updating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}