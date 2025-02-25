import { supabase } from '../../../supabaseClient';
import { Squad } from '../../../types/GameTypes';
import * as Sentry from "@sentry/browser";

export const fetchSquads = async (): Promise<Squad[]> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      return [];
    }

    const response = await fetch('/api/squads', {
      headers: {
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch squads');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching squads:', error);
    Sentry.captureException(error);
    return [];
  }
};

export const createSquad = async (squadData: Partial<Squad>): Promise<Squad | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error('User not authenticated');
    }

    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
      body: JSON.stringify(squadData),
    });

    if (!response.ok) {
      throw new Error('Failed to create squad');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating squad:', error);
    Sentry.captureException(error);
    return null;
  }
};

export const updateSquad = async (id: number | string, squadData: Partial<Squad>): Promise<Squad | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`/api/squadService?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
      body: JSON.stringify(squadData),
    });

    if (!response.ok) {
      throw new Error('Failed to update squad');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating squad:', error);
    Sentry.captureException(error);
    return null;
  }
};

export const deleteSquad = async (id: number | string): Promise<boolean> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`/api/squadService?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete squad');
    }

    return true;
  } catch (error) {
    console.error('Error deleting squad:', error);
    Sentry.captureException(error);
    return false;
  }
};

export const fetchSquadById = async (id: number | string): Promise<Squad | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`/api/squadService?id=${id}`, {
      headers: {
        Authorization: `Bearer ${sessionData.session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch squad');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching squad:', error);
    Sentry.captureException(error);
    return null;
  }
};