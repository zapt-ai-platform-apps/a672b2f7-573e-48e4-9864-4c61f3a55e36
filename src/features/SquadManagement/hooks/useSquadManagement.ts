import { useState, useEffect } from 'react';
import * as squadService from './useSquadManagementService';
import { useStateContext } from '../../../hooks/useStateContext';
import { Squad } from './useSquadManagementTypes';
import * as Sentry from "@sentry/browser";
import { Player } from '../../../types/GameTypes';
import { processSquads, processSquad, createPlayerObjects } from './squadManagementHelper';

function useSquadManagement() {
  const { setSelectedSquad } = useStateContext();
  const [squadName, setSquadName] = useState<string>('');
  const [newSquadPlayer, setNewSquadPlayer] = useState<string>('');
  const [squadPlayersList, setSquadPlayersList] = useState<string[]>([]);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingSquad, setEditingSquad] = useState<Squad | null>(null);

  useEffect(() => {
    async function loadSquads() {
      setLoading(true);
      try {
        const fetchedSquads = await squadService.fetchSquads();
        console.log('Fetched squads:', fetchedSquads);
        const processedSquads = processSquads(fetchedSquads);
        setSquads(processedSquads);
      } catch (error) {
        console.error('Error loading squads:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    }
    loadSquads();
  }, []);

  function handleAddSquadPlayer(): void {
    const trimmedPlayer = newSquadPlayer.trim();
    if (trimmedPlayer !== '') {
      setSquadPlayersList([...squadPlayersList, trimmedPlayer]);
      setNewSquadPlayer('');
    }
  }

  function handleDeleteSquadPlayer(player: string): void {
    setSquadPlayersList(squadPlayersList.filter((p) => p !== player));
  }

  async function handleCreateSquad(): Promise<void> {
    if (squadName.trim() === '') return;
    setLoading(true);
    try {
      const playerObjects = createPlayerObjects(squadPlayersList);
      await squadService.createSquad(squadName, JSON.stringify(playerObjects));
      const fetchedSquads = await squadService.fetchSquads();
      const processedSquads = processSquads(fetchedSquads);
      setSquads(processedSquads);
      setSquadName('');
      setSquadPlayersList([]);
      setNewSquadPlayer('');
    } catch (error) {
      console.error('Error in handleCreateSquad:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateSquad(): Promise<void> {
    if (!editingSquad || squadName.trim() === '') return;
    setLoading(true);
    try {
      const playerObjects = createPlayerObjects(squadPlayersList);
      await squadService.updateSquad(editingSquad.id, squadName, JSON.stringify(playerObjects));
      const fetchedSquads = await squadService.fetchSquads();
      const processedSquads = processSquads(fetchedSquads);
      setSquads(processedSquads);
      setEditingSquad(null);
      setSquadName('');
      setSquadPlayersList([]);
      setNewSquadPlayer('');
    } catch (error) {
      console.error('Error in handleUpdateSquad:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectSquad(squad: Squad): void {
    setSquadName(squad.name);
    const playerNames = Array.isArray(squad.players)
      ? squad.players.map((player: Player | string) => {
          if (typeof player === 'string') return player;
          return player.name;
        })
      : [];
    setSquadPlayersList(playerNames);
    setNewSquadPlayer('');
    setSelectedSquad(squad);
  }

  function handleEditSquad(squad: Squad): void {
    setEditingSquad(squad);
    const processedSquad = processSquad(squad);
    setSelectedSquad(processedSquad);
    setSquadName(squad.name);
    const playerNames = Array.isArray(processedSquad.players)
      ? processedSquad.players.map((player: Player | string) => {
          if (typeof player === 'string') return player;
          return player.name;
        })
      : [];
    setSquadPlayersList(playerNames);
    setNewSquadPlayer('');
  }

  function cancelEdit(): void {
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