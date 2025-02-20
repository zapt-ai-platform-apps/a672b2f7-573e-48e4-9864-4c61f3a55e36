import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../state';

interface Squad {
  name: string;
  players: any[];
  [key: string]: any;
}

function useEditSquadForm() {
  const { selectedSquad } = useStateContext<{ selectedSquad: Squad | null }>();
  const [squadName, setSquadName] = useState<string>(selectedSquad?.name || '');
  const [squadPlayersList, setSquadPlayersList] = useState<any[]>(selectedSquad?.players || []);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSquad) {
      setSquadName(selectedSquad.name);
      setSquadPlayersList(selectedSquad.players || []);
    }
  }, [selectedSquad]);

  const handleAddPlayer = (): void => {
    if (newPlayerName.trim() !== '') {
      setSquadPlayersList([...squadPlayersList, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const handleDeletePlayer = (index: number): void => {
    setSquadPlayersList(squadPlayersList.filter((_, idx) => idx !== index));
  };

  const handleUpdateSquad = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

  const handleBack = (): void => {
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