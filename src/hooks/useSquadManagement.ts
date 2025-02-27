import { useState, useCallback } from 'react';
import { Squad } from '../features/SquadManagement/types';
import {
  fetchSquadsFromApi,
  createSquadViaApi,
  updateSquadViaApi,
  deleteSquadViaApi,
  fetchSquadByIdFromApi,
  CreateSquadParams,
  UpdateSquadParams
} from '../features/SquadManagement/api/squadApi';

export default function useSquadManagement() {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [currentSquad, setCurrentSquad] = useState<Squad | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSquads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedSquads = await fetchSquadsFromApi();
      // Ensure all squad IDs are numbers
      setSquads(fetchedSquads.map(squad => ({
        ...squad,
        id: typeof squad.id === 'string' ? parseInt(squad.id, 10) : squad.id
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch squads');
      console.error('Error fetching squads:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSquadById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const squad = await fetchSquadByIdFromApi(id);
      // Ensure ID is a number
      setCurrentSquad({
        ...squad,
        id: typeof squad.id === 'string' ? parseInt(squad.id, 10) : squad.id
      });
      return squad;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to fetch squad with id ${id}`);
      console.error(`Error fetching squad with id ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createSquad = useCallback(async (squadData: CreateSquadParams) => {
    setLoading(true);
    setError(null);
    try {
      const newSquad = await createSquadViaApi(squadData);
      // Ensure ID is a number
      const squadWithNumberId = {
        ...newSquad,
        id: typeof newSquad.id === 'string' ? parseInt(newSquad.id, 10) : newSquad.id
      };
      setSquads(prev => [...prev, squadWithNumberId]);
      return squadWithNumberId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create squad');
      console.error('Error creating squad:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSquad = useCallback(async (squadData: UpdateSquadParams) => {
    setLoading(true);
    setError(null);
    try {
      const updatedSquad = await updateSquadViaApi(squadData);
      // Ensure ID is a number
      const squadWithNumberId = {
        ...updatedSquad,
        id: typeof updatedSquad.id === 'string' ? parseInt(updatedSquad.id, 10) : updatedSquad.id
      };
      setSquads(prev => 
        prev.map(squad => squad.id === squadWithNumberId.id ? squadWithNumberId : squad)
      );
      return squadWithNumberId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update squad');
      console.error('Error updating squad:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSquad = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteSquadViaApi(id);
      setSquads(prev => prev.filter(squad => squad.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete squad');
      console.error('Error deleting squad:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    squads,
    currentSquad,
    loading,
    error,
    fetchSquads,
    fetchSquadById,
    createSquad,
    updateSquad,
    deleteSquad
  };
}