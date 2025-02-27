import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state';
import SquadListView from './SquadListView';
import { Squad } from '../../types/GameTypes';
import { fetchSquads } from '../../features/SquadManagement/api/squadApi';
import * as Sentry from '@sentry/browser';

const SquadManagementScreen: React.FC = () => {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { selectedSquad, setSelectedSquad } = useStateContext();

  useEffect(() => {
    const loadSquads = async () => {
      try {
        setLoading(true);
        const squadsList = await fetchSquads();
        setSquads(squadsList);
      } catch (err) {
        console.error('Error loading squads:', err);
        Sentry.captureException(err);
        setError('Failed to load squads');
      } finally {
        setLoading(false);
      }
    };

    loadSquads();
  }, []);

  const handleAddSquad = () => {
    navigate('/squads/create');
  };

  const handleEditSquad = (squadId: number) => {
    navigate(`/squads/edit/${squadId}`);
  };

  const handleSelectSquad = (squad: Squad) => {
    // Parse player data if needed
    let parsedPlayers = [];
    try {
      if (typeof squad.players === 'string') {
        parsedPlayers = JSON.parse(squad.players);
      } else if (Array.isArray(squad.players)) {
        parsedPlayers = squad.players;
      }
    } catch (err) {
      console.error('Error parsing players:', err);
      Sentry.captureException(err);
      parsedPlayers = [];
    }

    // Update selected squad with parsed players
    setSelectedSquad({
      ...squad,
      players: parsedPlayers
    });

    // Navigate to setup game
    navigate('/setup/participants');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500 rounded-lg max-w-md mx-auto my-10">
        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
        <p className="text-white">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Squad Management</h1>
      
      <SquadListView 
        squads={squads}
        onAddSquad={handleAddSquad}
        onEditSquad={handleEditSquad}
        onSelectSquad={handleSelectSquad}
        // Remove the onCancel prop that's causing the type error
      />
    </div>
  );
};

export default SquadManagementScreen;