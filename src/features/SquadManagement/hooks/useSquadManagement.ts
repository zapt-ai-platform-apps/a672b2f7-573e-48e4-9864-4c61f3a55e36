import { useState, useEffect } from 'react';
import { useStateContext } from '../../../hooks/useStateContext';
import { Squad } from './useSquadManagementTypes';
import * as Sentry from "@sentry/browser";
import { loadSquads } from '../utils/squadManagementHandlers';
import {
  handleAddSquadPlayer as handleAddSquadPlayerImpl,
  handleDeleteSquadPlayer as handleDeleteSquadPlayerImpl,
  handleCreateSquad as handleCreateSquadImpl,
  handleUpdateSquad as handleUpdateSquadImpl,
  handleSelectSquad as handleSelectSquadImpl,
  handleEditSquad as handleEditSquadImpl,
  cancelEdit as cancelEditImpl
} from './squadManagementEventHandlers';

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
    handleAddSquadPlayerImpl(newSquadPlayer, squadPlayersList, setSquadPlayersList, setNewSquadPlayer);
  }

  function handleDeleteSquadPlayer(player: string): void {
    handleDeleteSquadPlayerImpl(player, squadPlayersList, setSquadPlayersList);
  }

  async function handleCreateSquad(): Promise<void> {
    await handleCreateSquadImpl(
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
    await handleUpdateSquadImpl(
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
    handleSelectSquadImpl(squad, setSquadName, setSquadPlayersList, setNewSquadPlayer, setSelectedSquad);
  }

  function handleEditSquad(squad: Squad): void {
    handleEditSquadImpl(squad, setEditingSquad, setSelectedSquad, setSquadName, setSquadPlayersList, setNewSquadPlayer);
  }

  function cancelEdit(): void {
    cancelEditImpl(setEditingSquad, setSquadName, setSquadPlayersList, setNewSquadPlayer);
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