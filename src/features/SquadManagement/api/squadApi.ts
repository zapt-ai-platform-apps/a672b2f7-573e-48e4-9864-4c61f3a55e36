import { Squad } from '../types';

export interface CreateSquadParams {
  name: string;
  players: { name: string; number?: string }[];
}

export interface UpdateSquadParams {
  id: number;
  name: string;
  players: any[]; // Allow any player format here to accommodate both string and Player[]
}

// API functions for working with squads
export async function fetchSquadsFromApi(): Promise<Squad[]> {
  try {
    const response = await fetch('/api/squads');
    if (!response.ok) {
      throw new Error('Failed to fetch squads');
    }
    const data = await response.json();
    
    // Ensure IDs are numbers
    return data.map((squad: any) => ({
      ...squad,
      id: typeof squad.id === 'string' ? parseInt(squad.id, 10) : squad.id
    }));
  } catch (error) {
    console.error('Error fetching squads:', error);
    throw error;
  }
}

export async function createSquadViaApi(squadData: CreateSquadParams): Promise<Squad> {
  try {
    const response = await fetch('/api/squads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadData),
    });

    if (!response.ok) {
      throw new Error('Failed to create squad');
    }
    
    const data = await response.json();
    // Ensure ID is a number
    return {
      ...data,
      id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id
    };
  } catch (error) {
    console.error('Error creating squad:', error);
    throw error;
  }
}

export async function updateSquadViaApi(squadData: UpdateSquadParams): Promise<Squad> {
  try {
    const response = await fetch(`/api/squads/${squadData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(squadData),
    });

    if (!response.ok) {
      throw new Error('Failed to update squad');
    }
    
    const data = await response.json();
    // Ensure ID is a number
    return {
      ...data,
      id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id
    };
  } catch (error) {
    console.error('Error updating squad:', error);
    throw error;
  }
}

export async function deleteSquadViaApi(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/squads/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete squad');
    }
  } catch (error) {
    console.error('Error deleting squad:', error);
    throw error;
  }
}

export async function fetchSquadByIdFromApi(id: number): Promise<Squad> {
  try {
    const response = await fetch(`/api/squads/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch squad');
    }
    
    const data = await response.json();
    // Ensure ID is a number
    return {
      ...data,
      id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id
    };
  } catch (error) {
    console.error(`Error fetching squad with id ${id}:`, error);
    throw error;
  }
}

// Export aliases for backwards compatibility
export const fetchSquads = fetchSquadsFromApi;
export const fetchSquadById = fetchSquadByIdFromApi;
export const updateSquad = updateSquadViaApi;
export const deleteSquad = deleteSquadViaApi;