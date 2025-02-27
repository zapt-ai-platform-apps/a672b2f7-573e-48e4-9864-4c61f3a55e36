import { supabase } from '../../../supabaseClient';
import { parsePlayers } from '../utils/playerParsing';
import * as Sentry from '@sentry/browser';
import { Squad } from '../types';
import { Player } from '../../../types/GameTypes';

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
        : Array.isArray(squad.players) ? squad.players : []
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
    
    // Create a copy of squadData to modify
    const squadDataToSend: Partial<Squad> = { ...squadData };
    
    // Always store players as a JSON string for consistency
    if (squadData.players) {
      // Handle different player formats
      if (Array.isArray(squadData.players)) {
        // Convert array of Player objects or strings to array of strings
        const playerNames = squadData.players.map(p => 
          typeof p === 'string' ? p : (p && 'name' in p ? String(p.name) : '')
        ).filter(Boolean);
        
        // Store as JSON string in the copy
        squadDataToSend.players = JSON.stringify(playerNames) as unknown as Player[];
      } else if (typeof squadData.players === 'string') {
        // If it's a string but not JSON, convert comma/newline-separated string to JSON
        const playerList = parsePlayers(squadData.players, 'createSquad');
        squadDataToSend.players = JSON.stringify(playerList) as unknown as Player[];
      }
    }
    
    console.log('Creating squad with players data:', squadDataToSend.players);
    
    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadDataToSend),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create squad');
    }
    
    const squad = await response.json();
    
    // Ensure the returned squad has players properly parsed
    if (typeof squad.players === 'string') {
      squad.players = parsePlayers(squad.players, 'createSquadResponse');
    }
    
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
    
    // Create a copy of squadData to modify
    const squadDataToSend: Partial<Squad> = { ...squadData };
    
    // Always store players as a JSON string for consistency
    if (squadData.players) {
      // Handle different player formats
      if (Array.isArray(squadData.players)) {
        // Convert array of Player objects or strings to array of strings
        const playerNames = squadData.players.map(p => 
          typeof p === 'string' ? p : (p && 'name' in p ? String(p.name) : '')
        ).filter(Boolean);
        
        // Store as JSON string in the copy
        squadDataToSend.players = JSON.stringify(playerNames) as unknown as Player[];
      } else if (typeof squadData.players === 'string') {
        // Check if it's already a JSON string
        const isJsonString = typeof squadData.players === 'string' && 
                            squadData.players.trim().startsWith('[') && 
                            squadData.players.trim().endsWith(']');
                            
        if (isJsonString) {
          squadDataToSend.players = squadData.players as unknown as Player[];
        } else {
          // If it's not a JSON string, convert comma/newline-separated string to JSON
          const playerList = parsePlayers(squadData.players, 'updateSquad');
          squadDataToSend.players = JSON.stringify(playerList) as unknown as Player[];
        }
      }
    }
    
    console.log('Updating squad with players data:', squadDataToSend.players);
    
    const response = await fetch(`/api/squadService?id=${squadId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadDataToSend),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update squad');
    }
    
    const squad = await response.json();
    
    // Ensure the returned squad has players properly parsed
    if (typeof squad.players === 'string') {
      squad.players = parsePlayers(squad.players, 'updateSquadResponse');
    }
    
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