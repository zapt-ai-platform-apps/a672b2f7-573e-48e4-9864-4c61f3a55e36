import { useState, useEffect } from 'react';
import * as squadService from './useSquadManagementService';
import { useStateContext } from '../state';

function useSquadManagement() {
  const { setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState('');
  const [newSquadPlayer, setNewSquadPlayer] = useState('');
  const [squadPlayersList, setSquadPlayersList] = useState([]);
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingSquad, setEditingSquad] = useState(null);

  useEffect(() => {
    async function loadSquads() {
      setLoading(true);
      try {
        const fetchedSquads = await squadService.fetchSquads();
        setSquads(fetchedSquads);
      } catch (error) {
        // Error handled in service
      } finally {
        setLoading(false);
      }
    }
    loadSquads();
  }, []);

  function handleAddSquadPlayer() {
    const trimmedPlayer = newSquadPlayer.trim();
    if (trimmedPlayer !== '') {
      setSquadPlayersList([...squadPlayersList, trimmedPlayer]);
      setNewSquadPlayer('');
    }
  }

  function handleDeleteSquadPlayer(player) {
    setSquadPlayersList(squadPlayersList.filter((p) => p !== player));
  }

  async function handleCreateSquad() {
    if (squadName.trim() === '') return;
    setLoading(true);
    try {
      await squadService.createSquad(squadName, squadPlayersList);
      const fetchedSquads = await squadService.fetchSquads();
      setSquads(fetchedSquads);
      setSquadName('');
      setSquadPlayersList([]);
      setNewSquadPlayer('');
    } catch (error) {
      // Error handled in service
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateSquad() {
    if (!editingSquad || squadName.trim() === '') return;
    setLoading(true);
    try {
      await squadService.updateSquad(editingSquad.id, squadName, squadPlayersList);
      const fetchedSquads = await squadService.fetchSquads();
      setSquads(fetchedSquads);
      setEditingSquad(null);
      setSquadName('');
      setSquadPlayersList([]);
      setNewSquadPlayer('');
    } catch (error) {
      // Error handled in service
    } finally {
      setLoading(false);
    }
  }

  function handleSelectSquad(squad) {
    setSquadName(squad.name);
    setSquadPlayersList(squad.players || []);
    setNewSquadPlayer('');
    setSelectedSquad(squad);
  }

  function handleEditSquad(squad) {
    setEditingSquad(squad);
    setSquadName(squad.name);
    setSquadPlayersList(squad.players || []);
    setNewSquadPlayer('');
  }

  function cancelEdit() {
    setEditingSquad(null);
    setSquadName('');
    setSquadPlayersList([]);
    setNewSquadPlayer('');
  }

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