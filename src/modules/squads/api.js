import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabaseClient';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import * as Sentry from '@sentry/browser';

export function useSquads() {
  const { user, session } = useAuthContext();
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch squads when the component mounts
  useEffect(() => {
    const fetchSquads = async () => {
      if (!user) {
        setSquads([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        const response = await fetch('/api/squads', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch squads');
        }
        
        const data = await response.json();
        setSquads(data);
      } catch (err) {
        console.error('Error fetching squads:', err);
        Sentry.captureException(err);
        setError('Failed to load squads');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSquads();
  }, [user, session]);
  
  // Create a new squad
  const createSquad = useCallback(async (name) => {
    if (!user || !name.trim()) {
      throw new Error('Authentication or squad name required');
    }
    
    try {
      const response = await fetch('/api/squads', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create squad');
      }
      
      const newSquad = await response.json();
      setSquads(prev => [...prev, newSquad]);
      return newSquad;
    } catch (err) {
      console.error('Error creating squad:', err);
      Sentry.captureException(err);
      throw err;
    }
  }, [user, session]);
  
  // Get players for a specific squad
  const getSquadPlayers = useCallback(async (squadId) => {
    if (!user || !squadId) {
      throw new Error('Authentication and squad ID required');
    }
    
    try {
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'getPlayers',
          squadId 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch squad players');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error fetching squad players:', err);
      Sentry.captureException(err);
      throw err;
    }
  }, [user, session]);
  
  // Add a player to a squad
  const addPlayerToSquad = useCallback(async (squadId, name) => {
    if (!user || !squadId || !name.trim()) {
      throw new Error('Authentication, squad ID, and player name required');
    }
    
    try {
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'addPlayer',
          squadId,
          name: name.trim() 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add player to squad');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error adding player to squad:', err);
      Sentry.captureException(err);
      throw err;
    }
  }, [user, session]);
  
  // Remove a player from a squad
  const removePlayerFromSquad = useCallback(async (squadId, playerId) => {
    if (!user || !squadId || !playerId) {
      throw new Error('Authentication, squad ID, and player ID required');
    }
    
    try {
      const response = await fetch('/api/squads-players', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
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
      
      return await response.json();
    } catch (err) {
      console.error('Error removing player from squad:', err);
      Sentry.captureException(err);
      throw err;
    }
  }, [user, session]);
  
  return {
    squads,
    loading,
    error,
    createSquad,
    getSquadPlayers,
    addPlayerToSquad,
    removePlayerFromSquad
  };
}