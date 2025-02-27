import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state';
import { Squad } from '../../features/SquadManagement/types';
import { fetchSquads } from '../../features/SquadManagement/api/squadApi';
import * as Sentry from '@sentry/browser';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import SquadList from '../../features/SquadManagement/components/SquadList';

const SquadManagementScreen: React.FC = () => {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSquad, setLocalSelectedSquad] = useState<Squad | null>(null);
  const navigate = useNavigate();
  const { setSelectedSquad } = useStateContext();

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

  const handleAddNewSquad = () => {
    navigate('/squads/create');
  };

  const handleEditSquad = (id: number) => {
    navigate(`/squads/edit/${id}`);
  };

  const handleSelectSquad = (id: number) => {
    const squad = squads.find(s => s.id === id);
    if (squad) {
      setLocalSelectedSquad(squad);
      
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
    }
  };

  const handleProceedToSetup = () => {
    if (selectedSquad) {
      navigate('/setup/participants');
    }
  };

  const handleDeleteSquad = (id: number) => {
    if (window.confirm('Are you sure you want to delete this squad?')) {
      // Implement delete functionality
      console.log('Delete squad with ID:', id);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Squad Management</h1>
      
      <div className="space-y-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
            Your Squads
          </h3>
          <p className="text-white/80">Select a squad to start a game or create a new one.</p>
        </div>

        {squads.length > 0 ? (
          <>
            <SquadList
              squads={squads}
              onEditSquad={handleEditSquad}
              onDeleteSquad={handleDeleteSquad}
              onSelectSquad={handleSelectSquad}
            />
            
            {selectedSquad && (
              <div className="pt-6 border-t border-white/20 mt-6">
                <button
                  onClick={handleProceedToSetup}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-colors shadow-lg cursor-pointer flex items-center justify-center"
                >
                  <span className="mr-2">Continue with {selectedSquad.name}</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-xl">
            <p className="text-white/80 mb-6 text-lg">You don't have any squads yet.</p>
            <button
              onClick={handleAddNewSquad}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-colors shadow-md cursor-pointer"
            >
              Create Your First Squad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadManagementScreen;