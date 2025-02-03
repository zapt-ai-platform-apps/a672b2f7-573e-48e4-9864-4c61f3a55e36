import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSquadsAPI, createSquadAPI } from '../api/squadAPI';
import { useStateContext } from '../state';
import SquadForm from '../components/SquadForm';
import SquadList from '../components/SquadList';

function SquadManagement() {
  const { setSelectedSquad } = useStateContext();
  const navigate = useNavigate();
  const [squadName, setSquadName] = useState('');
  const [newSquadPlayer, setNewSquadPlayer] = useState('');
  const [squadPlayersList, setSquadPlayersList] = useState([]);
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

  const handleSelectSquad = (squad) => {
    setSelectedSquad(squad);
    navigate('/setup');
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-brand-500">Squad Management</h1>
      <SquadForm
        squadName={squadName}
        setSquadName={setSquadName}
        newSquadPlayer={newSquadPlayer}
        setNewSquadPlayer={setNewSquadPlayer}
        squadPlayersList={squadPlayersList}
        handleAddSquadPlayer={handleAddSquadPlayer}
        handleDeleteSquadPlayer={handleDeleteSquadPlayer}
        handleCreateSquad={handleCreateSquad}
        loading={loading}
      />
      <SquadList
        squads={squads}
        loading={loading}
        handleSelectSquad={handleSelectSquad}
      />
    </div>
  );
}

export default SquadManagement;