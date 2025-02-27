import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../hooks/useStateContext';
import { squadServiceApi } from '../services/squadServiceApi';
import * as Sentry from '@sentry/browser';

export default function useEditSquadForm() {
  const { selectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState<string>('');
  const [squadPlayersList, setSquadPlayersList] = useState<any[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSquad) {
      // Initialize form with selected squad data
      if ('name' in selectedSquad) {
        setSquadName(selectedSquad.name || '');
      }

      const parsePlayers = (players: any): any[] => {
        if (Array.isArray(players)) {
          return players.map(player => {
            // If player is a string, create object
            if (typeof player === 'string') {
              return { id: Date.now() + Math.random(), name: player };
            }
            // If player is an object with name property
            if (player && typeof player === 'object' && 'name' in player) {
              return { id: player.id || Date.now() + Math.random(), name: player.name };
            }
            return null;
          }).filter(Boolean);
        }
        // If players is a string, try to parse it
        if (typeof players === 'string') {
          try {
            const parsed = JSON.parse(players);
            if (Array.isArray(parsed)) {
              return parsePlayers(parsed);
            }
          } catch (error) {
            // If not valid JSON, split by newlines or commas
            return players
              .split(/[\n,]/)
              .map(name => name.trim())
              .filter(Boolean)
              .map(name => ({ id: Date.now() + Math.random(), name }));
          }
        }
        return [];
      };

      const playersData = 'players' in selectedSquad ? selectedSquad.players : [];
      const parsedPlayers = parsePlayers(playersData);
      
      setSquadPlayersList(parsedPlayers);
    }
  }, [selectedSquad]);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      setSquadPlayersList([
        ...squadPlayersList,
        { id: Date.now().toString(), name: newPlayerName.trim() }
      ]);
      setNewPlayerName('');
    }
  };

  const handleDeletePlayer = (id: string) => {
    setSquadPlayersList(squadPlayersList.filter(player => player.id !== id));
  };

  const handleUpdateSquad = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!selectedSquad) {
      setError('No squad selected for update');
      return Promise.reject(new Error('No squad selected for update'));
    }

    if (!squadName.trim()) {
      setError('Squad name is required');
      return Promise.reject(new Error('Squad name is required'));
    }

    setLoading(true);
    setError('');

    try {
      const squadId = selectedSquad.id;
      const playersString = JSON.stringify(squadPlayersList.map(p => p.name));
      
      await squadServiceApi.updateSquad(squadId, {
        name: squadName,
        players: playersString
      });

      navigate('/squads');
      return Promise.resolve();
    } catch (err) {
      console.error('Error updating squad:', err);
      Sentry.captureException(err);
      setError('Failed to update squad. Please try again.');
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/squads');
  };

  return {
    squadName,
    setSquadName,
    squadPlayersList,
    newPlayerName,
    setNewPlayerName,
    loading,
    error,
    handleAddPlayer,
    handleDeletePlayer,
    handleUpdateSquad,
    handleBack,
  };
}