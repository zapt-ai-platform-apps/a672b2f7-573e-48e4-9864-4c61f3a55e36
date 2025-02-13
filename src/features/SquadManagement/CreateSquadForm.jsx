import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSquadAPI } from './api/squadAPI.js';
import { useStateContext } from '../../state';
import * as Sentry from '@sentry/browser';
import Loading from '../../components/Loading.jsx';

function CreateSquadForm() {
  const navigate = useNavigate();
  const { setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState('');
  const [playersInput, setPlayersInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateSquad = async (e) => {
    e.preventDefault();
    if (!squadName.trim() || !playersInput.trim()) {
      setError('Squad name and players are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const playersArray = playersInput.split(',').map(p => p.trim()).filter(p => p);
      const newSquad = await createSquadAPI(squadName, playersArray);
      setSelectedSquad(newSquad);
      navigate('/squads/options');
    } catch (err) {
      console.error('Error creating squad:', err);
      Sentry.captureException(err);
      setError('Failed to create squad. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreateSquad} className="w-full max-w-md">
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
        className="w-full py-4 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-colors"
        disabled={loading}
      >
        {loading ? <Loading /> : 'Create Squad'}
      </button>
    </form>
  );
}

export default CreateSquadForm;