import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSquadsAPI, createSquadAPI, updateSquadAPI } from '../api/squadAPI';
import { useStateContext } from '../state';

function useSquadManagement() {
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [squadName, setSquadName] = useState('');
  const [newSquadPlayer, setNewSquadPlayer] = useState('');
  const [squadPlayersList, setSquadPlayersList] = useState([]);
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingSquad, setEditingSquad] = useState(null);

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

  const handleAddSquadPlayer = () => {
    if (newSquadPlayer.trim()) {
      setSquadPlayersList([...squadPlayersList, newSquadPlayer.trim()]);
      setNewSquadPlayer('');
    }
  };

  const handleDeleteSquadPlayer = (index) => {
    const updatedPlayers = [...squadPlayersList];
    updatedPlayers.splice(index, 1);
    setSquadPlayersList(updatedPlayers);
  };

  const handleCreateSquad = async (e) => {
    e.preventDefault();
    if (!squadName.trim() || squadPlayersList.length === 0) {
      alert('Please provide a squad name and add at least one player.');
      return;
    }
    try {
      setLoading(true);
      await createSquadAPI(squadName, squadPlayersList);
      setSquadName('');
      setSquadPlayersList([]);
      loadSquads();
    } catch (error) {
      // Error is already handled in createSquadAPI
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSquad = async (name, players) => {
    try {
      setLoading(true);
      await updateSquadAPI(editingSquad.id, name, players);
      setEditingSquad(null);
      setSquadName('');
      setSquadPlayersList([]);
      loadSquads();
    } catch (error) {
      // Error is already handled in updateSquadAPI
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSquad = (squad) => {
    setSelectedSquad(squad);
    navigate('/setup');
  };

  const handleEditSquad = (squad) => {
    setEditingSquad(squad);
    setSquadName(squad.name);
    if (Array.isArray(squad.players)) {
      setSquadPlayersList(squad.players);
    } else {
      setSquadPlayersList(squad.players.split(',').map(p => p.trim()));
    }
  };

  const cancelEdit = () => {
    setEditingSquad(null);
    setSquadName('');
    setSquadPlayersList([]);
  };

  return {
    squadName,
    setSquadName,
    newSquadPlayer,
    setNewSquadPlayer,
    squadPlayersList,
    squads,
    loading,
    editingSquad,
    handleAddSquadPlayer,
    handleDeleteSquadPlayer,
    handleCreateSquad,
    handleUpdateSquad,
    handleSelectSquad,
    handleEditSquad,
    cancelEdit
  };
}

export default useSquadManagement;