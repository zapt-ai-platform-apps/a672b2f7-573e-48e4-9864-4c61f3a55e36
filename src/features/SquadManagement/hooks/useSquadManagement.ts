import { useState, useEffect } from 'react';
import * as squadService from './useSquadManagementService';
import { useStateContext } from '../../../state';

function useSquadManagement() {
  const { setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState<string>('');
  const [newSquadPlayer, setNewSquadPlayer] = useState<string>('');
  const [squadPlayersList, setSquadPlayersList] = useState<any[]>([]);
  const [squads, setSquads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingSquad, setEditingSquad] = useState<any>(null);

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

  function handleDeleteSquadPlayer(player: string) {
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

  function handleSelectSquad(squad: any) {
    setSquadName(squad.name);
    setSquadPlayersList(squad.players || []);
    setNewSquadPlayer('');
    setSelectedSquad(squad);
  }

  function handleEditSquad(squad: any) {
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