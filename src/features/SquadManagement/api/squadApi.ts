import { supabase } from '../../../supabaseClient';
import * as Sentry from '@sentry/browser';
import { Squad } from '../types';

export interface CreateSquadParams {
  name: string;
  players: string;
}

export interface UpdateSquadParams {
  id: number;
  name: string;
  players: string;
}

export async function fetchSquadsFromApi(): Promise<Squad[]> {
  try {
    // Get user session to include the Authorization header
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/squads', {
      method: 'GET',
      headers: {
        // Include Authorization header with access token
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {}),
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch squads: ${errorData.message || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching squads:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function fetchSquadByIdFromApi(id: number): Promise<Squad> {
  try {
    // Get user session to include the Authorization header
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`/api/squads/${id}`, {
      method: 'GET',
      headers: {
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {}),
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch squad with id ${id}: ${errorData.message || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching squad with id ${id}:`, error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function createSquadViaApi(squadData: CreateSquadParams): Promise<Squad> {
  try {
    // Get user session to include the Authorization header
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated to create a squad');
    }
    
    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to create squad: ${errorData.message || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function updateSquadViaApi(squadData: UpdateSquadParams): Promise<Squad> {
  try {
    // Get user session to include the Authorization header
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated to update a squad');
    }
    
    const response = await fetch(`/api/squads/${squadData.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to update squad: ${errorData.message || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function deleteSquadViaApi(id: number): Promise<void> {
  try {
    // Get user session to include the Authorization header
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User must be authenticated to delete a squad');
    }
    
    const response = await fetch(`/api/squads/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to delete squad: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}