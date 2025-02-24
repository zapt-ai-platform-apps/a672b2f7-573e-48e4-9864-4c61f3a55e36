import * as Sentry from '@sentry/browser';
import { getAuthHeaders, handleResponse } from './apiClient';

export const fetchSquads = async (): Promise<any[]> => {
  try {
    const headers = await getAuthHeaders();
    console.log("Fetching squads with auth token");
    const response = await fetch("/api/squads", {
      method: "GET",
      headers: headers
    });
    const data = await handleResponse(response);
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
    const headers = await getAuthHeaders();
    const response = await fetch("/api/squads", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(squad)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating squad:", error);
    Sentry.captureException(error);
    throw error;
  }
};

export const updateSquad = async (id: string, squad: { name: string; players: any[] }): Promise<any> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch("/api/squads", {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        id,
        ...squad
      })
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating squad:", error);
    Sentry.captureException(error);
    throw error;
  }
};