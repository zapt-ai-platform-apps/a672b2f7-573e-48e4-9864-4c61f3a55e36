import { supabase } from '../../../supabaseClient';
import { parsePlayers } from '../utils/playerParsing';
import * as Sentry from '@sentry/browser';
import { Squad } from '../types';

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
    
    // Process each squad to ensure players are properly parsed
    return squads.map((squad: Record<string, unknown>) => ({
      ...squad,
      // Parse players if they're stored as a string
      players: typeof squad.players === 'string' 
        ? parsePlayers(squad.players, `squad-${squad.id}`) 
        : squad.players
    }));
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
    
    // Always store players as a JSON string for consistency
    if (Array.isArray(squadData.players)) {
      // Convert array of objects to array of strings if needed
      const playerNames = squadData.players.map(p => 
        typeof p === 'string' ? p : (p.name || '')
      ).filter(Boolean);
      
      // Store as JSON string
      squadData.players = JSON.stringify(playerNames);
    } else if (typeof squadData.players === 'string' && !squadData.players.startsWith('[')) {
      // If it's a string but not JSON, convert comma/newline-separated string to JSON
      const playerList = parsePlayers(squadData.players, 'createSquad');
      squadData.players = JSON.stringify(playerList);
    }
    
    console.log('Creating squad with players data:', squadData.players);
    
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
    
    // Always store players as a JSON string for consistency
    if (Array.isArray(squadData.players)) {
      // Convert array of objects to array of strings if needed
      const playerNames = squadData.players.map(p => 
        typeof p === 'string' ? p : (p.name || '')
      ).filter(Boolean);
      
      // Store as JSON string
      squadData.players = JSON.stringify(playerNames);
    } else if (typeof squadData.players === 'string' && !squadData.players.startsWith('[')) {
      // If it's a string but not JSON, convert comma/newline-separated string to JSON
      const playerList = parsePlayers(squadData.players, 'updateSquad');
      squadData.players = JSON.stringify(playerList);
    }
    
    console.log('Updating squad with players data:', squadData.players);
    
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
    
    // Ensure players are properly parsed
    if (typeof squad.players === 'string') {
      squad.players = parsePlayers(squad.players, `fetchSquad-${squadId}`);
    }
    
    return squad;
  } catch (error) {
    console.error('Error fetching squad:', error);
    Sentry.captureException(error);
    throw error;
  }
}