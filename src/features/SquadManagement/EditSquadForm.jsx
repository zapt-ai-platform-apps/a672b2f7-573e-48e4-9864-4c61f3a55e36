import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSquadAPI } from '../../api/squadAPI.js';
import { useStateContext } from '../../state';
import * as Sentry from '@sentry/browser';
import Loading from '../../components/Loading.jsx';

function EditSquadForm() {
  const navigate = useNavigate();
  const { selectedSquad, setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState('');
  const [playersInput, setPlayersInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedSquad) {
      navigate('/squads', { replace: true });
    } else {
      setSquadName(selectedSquad.name);
      setPlayersInput(selectedSquad.players);
    }
  }, [selectedSquad, navigate]);

  const handleUpdateSquad = async (e) => {
    e.preventDefault();
    if (!squadName.trim() || !playersInput.trim()) {
      setError('Squad name and players are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const playersArray = playersInput.split(',').map(p => p.trim()).filter(p => p);
      const updatedSquad = await updateSquadAPI(selectedSquad.id, squadName, playersArray);
      setSelectedSquad(updatedSquad);
      navigate('/squads/options');
    } catch (err) {
      console.error('Error updating squad:', err);
      Sentry.captureException(err);
      setError('Failed to update squad. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Edit Squad</h1>
      <form onSubmit={handleUpdateSquad} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-lg mb-2">Squad Name</label>
          <input
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-4 border rounded box-border text-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Players (comma separated)</label>
          <input
            type="text"
            value={playersInput}
            onChange={(e) => setPlayersInput(e.target.value)}
            className="w-full p-4 border rounded box-border text-lg"
          />
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-4 bg-yellow-500 text-white text-lg rounded-md cursor-pointer hover:bg-yellow-600 transition-colors"
          disabled={loading}
        >
          {loading ? <Loading /> : 'Update Squad'}
        </button>
      </form>
    </div>
  );
}

export default EditSquadForm;