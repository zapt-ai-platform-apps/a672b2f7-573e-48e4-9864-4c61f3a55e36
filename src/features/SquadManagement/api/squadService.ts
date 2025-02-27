import { supabase } from '../../../supabaseClient';
import parsePlayers from '../../../utils/parsePlayers';
import { getSquadPlayers } from '../utils/squadUtils';
import * as Sentry from '@sentry/browser';

export interface Squad {
  id: number;
  name: string;
  players: string | any[];
  createdAt?: string;
}

/**
 * Fetches all squads for the current user
 */
export async function fetchSquads(): Promise<Squad[]> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No authenticated session');
    }
    
    const response = await fetch('/api/squads', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch squads');
    }
    
    const squads = await response.json();
    return squads;
  } catch (error) {
    console.error('Error fetching squads:', error);
    Sentry.captureException(error);
    throw error;
  }
}

/**
 * Creates a new squad with the given data
 */
export async function createSquad(squadData: Partial<Squad>): Promise<Squad> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No authenticated session');
    }
    
    // If players data is an array, convert to comma-separated string format
    if (Array.isArray(squadData.players)) {
      squadData.players = squadData.players.map(p => 
        typeof p === 'string' ? p : p.name
      ).join(',');
    }
    
    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create squad');
    }
    
    const squad = await response.json();
    return squad;
  } catch (error) {
    console.error('Error creating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}

/**
 * Updates an existing squad with the given data
 */
export async function updateSquad(squadId: number, squadData: Partial<Squad>): Promise<Squad> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No authenticated session');
    }
    
    // If players data is an array, convert to comma-separated string format
    if (Array.isArray(squadData.players)) {
      squadData.players = squadData.players.map(p => 
        typeof p === 'string' ? p : p.name
      ).join(',');
    }
    
    const response = await fetch(`/api/squadService?id=${squadId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update squad');
    }
    
    const squad = await response.json();
    return squad;
  } catch (error) {
    console.error('Error updating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}

/**
 * Deletes a squad by ID
 */
export async function deleteSquad(squadId: number): Promise<void> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No authenticated session');
    }
    
    const response = await fetch(`/api/squadService?id=${squadId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete squad');
    }
  } catch (error) {
    console.error('Error deleting squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}

/**
 * Fetches a squad by ID
 */
export async function fetchSquadById(squadId: number): Promise<Squad> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No authenticated session');
    }
    
    const response = await fetch(`/api/squadService?id=${squadId}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch squad');
    }
    
    const squad = await response.json();
    return squad;
  } catch (error) {
    console.error('Error fetching squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}