import { supabase } from '../../../supabaseClient';
import * as Sentry from '@sentry/browser';

export const fetchSquads = async (): Promise<any[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.error("No active session found");
      throw new Error("No active session found");
    }

    console.log("Fetching squads with auth token");
    const response = await fetch("/api/squads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Network response was not ok: ${response.status}`, errorText);
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    console.log("Successfully fetched squads:", data);
    return data;
  } catch (error) {
    console.error("Error fetching squads:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const createSquad = async (squad: { name: string; players: any[] }): Promise<any> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("No active session found");
    }

    const response = await fetch("/api/squads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify(squad)
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating squad:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const updateSquad = async (id: string, squad: { name: string; players: any[] }): Promise<any> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("No active session found");
    }

    const response = await fetch(`/api/squads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify(squad)
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating squad:", error);
    Sentry.captureException(error);
    throw error;
  }
};