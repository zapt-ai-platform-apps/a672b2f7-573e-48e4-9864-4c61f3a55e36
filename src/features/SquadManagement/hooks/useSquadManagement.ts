import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { Squad } from './useSquadManagementTypes';
import * as Sentry from "@sentry/browser";
import {
  addSquadPlayer,
  deleteSquadPlayer,
  createSquad as createSquadHandler,
  updateSquad as updateSquadHandler,
  selectSquad,
  editSquad,
  cancelEditing,
  loadSquads
} from '../../utils/squadManagementHandlers';

function useSquadManagement() {
  const { setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState('');
  const [newSquadPlayer, setNewSquadPlayer] = useState('');
  const [squadPlayersList, setSquadPlayersList] = useState<string[]>([]);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingSquad, setEditingSquad] = useState<Squad | null>(null);

  useEffect(() => {
    loadSquads(setLoading, setSquads);
  }, []);

  function handleAddSquadPlayer(): void {
    addSquadPlayer(newSquadPlayer, squadPlayersList, setSquadPlayersList, setNewSquadPlayer);
  }

  function handleDeleteSquadPlayer(player: string): void {
    deleteSquadPlayer(player, squadPlayersList, setSquadPlayersList);
  }

  async function handleCreateSquad(): Promise<void> {
    await createSquadHandler(
      squadName,
      squadPlayersList,
      setLoading,
      setSquads,
      setSquadName,
      setSquadPlayersList,
      setNewSquadPlayer
    );
  }

  async function handleUpdateSquad(): Promise<void> {
    await updateSquadHandler(
      editingSquad,
      squadName,
      squadPlayersList,
      setLoading,
      setSquads,
      setEditingSquad,
      setSquadName,
      setSquadPlayersList,
      setNewSquadPlayer
    );
  }

  function handleSelectSquad(squad: Squad): void {
    selectSquad(squad, setSquadName, setSquadPlayersList, setNewSquadPlayer, setSelectedSquad);
  }

  function handleEditSquad(squad: Squad): void {
    editSquad(squad, setEditingSquad, setSelectedSquad, setSquadName, setSquadPlayersList, setNewSquadPlayer);
  }

  function cancelEdit(): void {
    cancelEditing(setEditingSquad, setSquadName, setSquadPlayersList, setNewSquadPlayer);
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