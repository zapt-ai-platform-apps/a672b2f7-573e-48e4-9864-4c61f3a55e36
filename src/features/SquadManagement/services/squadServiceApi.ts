import { Squad } from '../hooks/useSquadManagementTypes';
import { supabase } from '../../../supabaseClient';
import * as Sentry from '@sentry/browser';

export async function fetchSquads(): Promise<Squad[]> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !session.access_token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch('/api/squads', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch squads');
    }
    const squadsData = await response.json();
    return squadsData as Squad[];
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error fetching squads:', error);
    throw error;
  }
}

export async function createSquad(name: string, players: string[]): Promise<void> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !session.access_token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, players }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create squad');
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error creating squad:', error);
    throw error;
  }
}

export async function updateSquad(id: number, name: string, players: string[]): Promise<void> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !session.access_token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch('/api/squads', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, players }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update squad');
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error updating squad:', error);
    throw error;
  }
}