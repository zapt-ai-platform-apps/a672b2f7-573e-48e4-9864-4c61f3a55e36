import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSquadsAPI, createSquadAPI } from '../api/squadAPI';
import { useStateContext } from '../state';

function SquadManagement() {
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [squadName, setSquadName] = useState('');
  const [squadPlayers, setSquadPlayers] = useState('');
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSquads = async () => {
    try {
      setLoading(true);
      const data = await fetchSquadsAPI();
      setSquads(data);
    } catch (error) {
      // Error is already handled in fetchSquadsAPI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSquads();
  }, []);

  const handleCreateSquad = async (e) => {
    e.preventDefault();
    if (!squadName.trim() || !squadPlayers.trim()) {
      alert('Please provide squad name and players (comma separated).');
      return;
    }
    try {
      setLoading(true);
      await createSquadAPI(squadName, squadPlayers);
      setSquadName('');
      setSquadPlayers('');
      loadSquads();
    } catch (error) {
      // Error is already handled in createSquadAPI
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSquad = (squad) => {
    setSelectedSquad(squad);
    navigate('/setup');
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-brand-500">Squad Management</h1>
      <form onSubmit={handleCreateSquad} className="mb-8 space-y-4">
        <div>
          <label className="block text-lg mb-2">Squad Name:</label>
          <input
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded box-border text-lg"
          />
        </div>
        <div>
          <label className="block text-lg mb-2">Players (comma separated):</label>
          <input
            type="text"
            value={squadPlayers}
            onChange={(e) => setSquadPlayers(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded box-border text-lg"
          />
        </div>
        <button
          type="submit"
          className="px-8 py-4 bg-green-500 text-white text-lg rounded cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Squad'}
        </button>
      </form>
      <div>
        <h2 className="text-3xl font-bold mb-4">Your Squads</h2>
        {loading ? (
          <p>Loading squads...</p>
        ) : squads.length > 0 ? (
          <ul className="space-y-4">
            {squads.map((squad) => (
              <li key={squad.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded">
                <h3 className="text-2xl font-semibold">{squad.name}</h3>
                <p className="mt-2">Players: {squad.players}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Created at: {new Date(squad.created_at).toLocaleString()}
                </p>
                <button
                  className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg rounded cursor-pointer hover:bg-blue-600 transition-all duration-300"
                  onClick={() => handleSelectSquad(squad)}
                >
                  Select Squad
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No squads found. Create one above!</p>
        )}
      </div>
    </div>
  );
}

export default SquadManagement;