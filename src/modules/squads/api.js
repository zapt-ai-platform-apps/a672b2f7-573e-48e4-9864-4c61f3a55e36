import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import { supabase } from '@/supabaseClient';
import * as Sentry from '@sentry/browser';

export function useSquads() {
  const { user } = useAuthContext();
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSquads = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      console.log('Fetching squads for user:', user.id);
      const response = await fetch('/api/squads', {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch squads');
      }
      
      const data = await response.json();
      console.log('Fetched squads:', data.length);
      setSquads(data);
    } catch (err) {
      console.error('Error fetching squads:', err);
      Sentry.captureException(err);
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

  // Helper function to get auth token
  const getAuthToken = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token;
    } catch (err) {
      console.error('Error getting auth token:', err);
      Sentry.captureException(err);
      throw err;
    }
  };

  const createSquad = useCallback(async (squadName) => {
    try {
      console.log('Creating new squad:', squadName);
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
      console.log('New squad created:', newSquad);
      setSquads(prev => [...prev, newSquad]);
      return newSquad;
    } catch (err) {
      console.error('Error creating squad:', err);
      Sentry.captureException(err);
      setError(err.message);
      throw err;
    }
  }, []);

  // Fixed-path API with POST request for getting squad players
  const getSquadPlayers = useCallback(async (squadId) => {
    try {
      console.log('Fetching players for squad:', squadId);
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ 
          action: 'getPlayers',
          squadId 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch squad players');
      }
      
      const players = await response.json();
      console.log('Fetched players:', players.length);
      return players;
    } catch (err) {
      console.error('Error fetching squad players:', err);
      Sentry.captureException(err);
      setError(err.message);
      throw err;
    }
  }, []);

  // Fixed-path API with POST request for adding a player to squad
  const addPlayerToSquad = useCallback(async (squadId, playerName) => {
    try {
      console.log(`Adding player "${playerName}" to squad:`, squadId);
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ 
          action: 'addPlayer',
          squadId,
          name: playerName 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add player to squad');
      }
      
      const newPlayer = await response.json();
      console.log('Player added successfully:', newPlayer);
      return newPlayer;
    } catch (err) {
      console.error('Error adding player to squad:', err);
      Sentry.captureException(err);
      setError(err.message);
      throw err;
    }
  }, []);

  // Fixed-path API with POST request for removing a player from squad
  const removePlayerFromSquad = useCallback(async (squadId, playerId) => {
    try {
      console.log(`Removing player ${playerId} from squad:`, squadId);
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ 
          action: 'removePlayer',
          squadId,
          playerId 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove player from squad');
      }
      
      console.log(`Player ${playerId} removed successfully`);
      return true;
    } catch (err) {
      console.error('Error removing player from squad:', err);
      Sentry.captureException(err);
      setError(err.message);
      throw err;
    }
  }, []);

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