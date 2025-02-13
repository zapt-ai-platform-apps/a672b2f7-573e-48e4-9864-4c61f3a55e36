import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSquadAPI } from '../../api/squadAPI.js';
import { useStateContext } from '../../state';
import * as Sentry from '@sentry/browser';
import { parsePlayers } from '../../../lib/utils.js';

function useEditSquadForm() {
  const navigate = useNavigate();
  const { selectedSquad, setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState('');
  const [squadPlayersList, setSquadPlayersList] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedSquad) {
      navigate('/squads', { replace: true });
    } else {
      setSquadName(selectedSquad.name);
      setSquadPlayersList(parsePlayers(selectedSquad.players));
    }
  }, [selectedSquad, navigate]);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      setSquadPlayersList([...squadPlayersList, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const handleDeletePlayer = (index) => {
    const updatedList = squadPlayersList.filter((_, i) => i !== index);
    setSquadPlayersList(updatedList);
  };

  const handleUpdateSquad = async (e) => {
    e.preventDefault();
    if (!squadName.trim() || squadPlayersList.length === 0) {
      setError('Squad name and at least one player are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const updatedSquad = await updateSquadAPI(selectedSquad.id, squadName, squadPlayersList);
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

  const handleBack = () => {
    navigate('/squads/options');
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
    handleBack
  };
}

export default useEditSquadForm;