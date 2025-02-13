import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useEditSquadForm() {
  const [squadName, setSquadName] = useState('');
  const [squadPlayersList, setSquadPlayersList] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      setSquadPlayersList([...squadPlayersList, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const handleDeletePlayer = (index) => {
    setSquadPlayersList(squadPlayersList.filter((_, idx) => idx !== index));
  };

  const handleUpdateSquad = async (e) => {
    e.preventDefault();
    setError('');
    if (!squadName.trim()) {
      setError('Squad name cannot be empty.');
      return;
    }
    if (squadPlayersList.length === 0) {
      setError('Squad must have at least one player.');
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/squads');
    } catch (err) {
      setError('Failed to update squad.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
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