import { Squad } from './useSquadManagementTypes';
import * as squadApi from '../services/squadApiFunctions';
import * as Sentry from '@sentry/browser';

export async function fetchSquads(): Promise<Squad[]> {
  try {
    const squads = await squadApi.fetchSquads();
    console.log('Fetched squads from API:', squads);
    return squads;
  } catch (error) {
    console.error('Error fetching squads from API:', error);
    Sentry.captureException(error);
    return [];
  }
}

export async function createSquad(name: string, players: string[]): Promise<void> {
  try {
    await squadApi.createSquad({ name, players });
    console.log('Squad created successfully');
  } catch (error) {
    console.error('Error creating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function updateSquad(id: string, name: string, players: string[]): Promise<void> {
  try {
    await squadApi.updateSquad(id, { name, players });
    console.log('Squad updated successfully');
  } catch (error) {
    console.error('Error updating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}