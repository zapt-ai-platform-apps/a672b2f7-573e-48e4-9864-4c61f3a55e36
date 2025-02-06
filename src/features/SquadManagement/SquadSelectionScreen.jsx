import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSquads } from './hooks/useSquadManagementService.js';
import { useStateContext } from '../../state';
import Loading from '../../components/Loading.jsx';

function SquadSelectionScreen() {
  const navigate = useNavigate();
  const { setSelectedSquad } = useStateContext();
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSquads() {
      try {
        const data = await fetchSquads();
        setSquads(data);
        if (data.length === 0) {
          navigate('/squads/new', { replace: true });
        }
      } catch (error) {
        console.error('Error loading squads:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSquads();
  }, [navigate]);

  const handleSelect = (squad) => {
    setSelectedSquad(squad);
    navigate('/squads/options');
  };

  const handleCreateNew = () => {
    navigate('/squads/new');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-brand-500">Your Squads</h1>
      <div className="mb-8">
        {squads.map((squad) => (
          <div
            key={squad.id}
            onClick={() => handleSelect(squad)}
            className="p-4 mb-4 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold">{squad.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">Players: {squad.players}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreateNew}
        className="px-6 py-3 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-colors"
      >
        Create New Squad
      </button>
    </div>
  );
}

export default SquadSelectionScreen;