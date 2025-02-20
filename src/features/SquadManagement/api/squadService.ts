import { supabase } from '../../../supabaseClient';
import * as Sentry from '@sentry/browser';

export async function fetchSquadsAPI() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/squads', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching squads');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return [];
  }
}

export async function createSquadAPI(squadName: string, squadPlayers: string | string[]) {
  try {
    let playersArray: string[];
    if (Array.isArray(squadPlayers)) {
      playersArray = squadPlayers;
    } else {
      playersArray = squadPlayers.split(',').map(player => player.trim());
    }
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        name: squadName,
        players: playersArray,
      }),
    });
    if (!response.ok) {
      throw new Error('Error creating squad');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    throw error;
  }
}

export async function updateSquadAPI(squadId: string, squadName: string, squadPlayers: string | string[]) {
  try {
    let playersArray: string[];
    if (Array.isArray(squadPlayers)) {
      playersArray = squadPlayers;
    } else {
      playersArray = squadPlayers.split(',').map(player => player.trim());
    }
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch('/api/squads', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        id: squadId,
        name: squadName,
        players: playersArray,
      }),
    });
    if (!response.ok) {
      throw new Error('Error updating squad');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    throw error;
  }
}