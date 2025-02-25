import * as squadService from '../hooks/useSquadManagementService';
import * as Sentry from "@sentry/browser";
import { processSquads, processSquad, createPlayerObjects } from '../hooks/squadManagementHelper';

export async function loadSquads(
  setLoading: (flag: boolean) => void,
  setSquads: (squads: any[]) => void
): Promise<void> {
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

export function addSquadPlayer(
  newSquadPlayer: string,
  squadPlayersList: string[],
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void
): void {
  const trimmedPlayer = newSquadPlayer.trim();
  if (trimmedPlayer !== '') {
    setSquadPlayersList([...squadPlayersList, trimmedPlayer]);
    setNewSquadPlayer('');
  }
}

export function deleteSquadPlayer(
  player: string,
  squadPlayersList: string[],
  setSquadPlayersList: (list: string[]) => void
): void {
  setSquadPlayersList(squadPlayersList.filter((p) => p !== player));
}

export async function createSquad(
  squadName: string,
  squadPlayersList: string[],
  setLoading: (flag: boolean) => void,
  setSquads: (squads: any[]) => void,
  setSquadName: (name: string) => void,
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void
): Promise<void> {
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
    console.error('Error in createSquad:', error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
}

export async function updateSquad(
  editingSquad: { id: any } | null,
  squadName: string,
  squadPlayersList: string[],
  setLoading: (flag: boolean) => void,
  setSquads: (squads: any[]) => void,
  setEditingSquad: (squad: any) => void,
  setSquadName: (name: string) => void,
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void
): Promise<void> {
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
    console.error('Error in updateSquad:', error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
}

export function selectSquad(
  squad: any,
  setSquadName: (name: string) => void,
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void,
  setSelectedSquad: (squad: any) => void
): void {
  setSquadName(squad.name);
  let players = squad.players;
  if (typeof players === 'string') {
    try {
      players = JSON.parse(players);
    } catch (error) {
      console.error('Error parsing squad.players:', error);
      Sentry.captureException(error);
      players = [];
    }
  }
  const playerNames = Array.isArray(players)
    ? players.map((player: any) => (typeof player === 'string' ? player : player.name))
    : [];
  setSquadPlayersList(playerNames);
  setNewSquadPlayer('');
  setSelectedSquad(squad);
}

export function editSquad(
  squad: any,
  setEditingSquad: (squad: any) => void,
  setSelectedSquad: (squad: any) => void,
  setSquadName: (name: string) => void,
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void
): void {
  setEditingSquad(squad);
  const processedSquad = processSquad(squad);
  setSelectedSquad(processedSquad);
  setSquadName(squad.name);
  let players = processedSquad.players;
  if (typeof players === 'string') {
    try {
      players = JSON.parse(players);
    } catch (error) {
      console.error('Error parsing processedSquad.players:', error);
      Sentry.captureException(error);
      players = [];
    }
  }
  const playerNames = Array.isArray(players)
    ? players.map((player: any) => (typeof player === 'string' ? player : player.name))
    : [];
  setSquadPlayersList(playerNames);
  setNewSquadPlayer('');
}

export function cancelEditing(
  setEditingSquad: (squad: any) => void,
  setSquadName: (name: string) => void,
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void
): void {
  setEditingSquad(null);
  setSquadName('');
  setSquadPlayersList([]);
  setNewSquadPlayer('');
}