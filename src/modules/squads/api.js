import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';

export function useSquads() {
  const { user } = useAuthContext();
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSquads = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/squads', {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch squads');
      }
      
      const data = await response.json();
      setSquads(data);
    } catch (err) {
      console.error('Error fetching squads:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchSquads();
    } else {
      setSquads([]);
    }
  }, [user, fetchSquads]);

  const createSquad = async (squadName) => {
    try {
      const response = await fetch('/api/squads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ name: squadName }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create squad');
      }
      
      const newSquad = await response.json();
      setSquads(prev => [...prev, newSquad]);
      return newSquad;
    } catch (err) {
      console.error('Error creating squad:', err);
      setError(err.message);
      throw err;
    }
  };

  const getSquadPlayers = async (squadId) => {
    try {
      const response = await fetch(`/api/squads/${squadId}/players`, {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch squad players');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error fetching squad players:', err);
      setError(err.message);
      throw err;
    }
  };

  const addPlayerToSquad = async (squadId, playerName) => {
    try {
      const response = await fetch(`/api/squads/${squadId}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ name: playerName }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add player to squad');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error adding player to squad:', err);
      setError(err.message);
      throw err;
    }
  };

  const removePlayerFromSquad = async (squadId, playerId) => {
    try {
      const response = await fetch(`/api/squads/${squadId}/players/${playerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove player from squad');
      }
      
      return true;
    } catch (err) {
      console.error('Error removing player from squad:', err);
      setError(err.message);
      throw err;
    }
  };

  // Helper function to get auth token
  const getAuthToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  };

  return {
    squads,
    loading,
    error,
    refreshSquads: fetchSquads,
    createSquad,
    getSquadPlayers,
    addPlayerToSquad,
    removePlayerFromSquad,
  };
}