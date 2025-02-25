import * as squadService from "../hooks/useSquadManagementService";
import * as Sentry from "@sentry/browser";
import { processSquads, createPlayerObjects } from "../hooks/squadManagementHelper";

export async function loadSquads(
  setLoading: (flag: boolean) => void,
  setSquads: (squads: any[]) => void
): Promise<void> {
  setLoading(true);
  try {
    const fetchedSquads = await squadService.fetchSquads();
    console.log("Fetched squads:", fetchedSquads);
    const processedSquads = processSquads(fetchedSquads);
    setSquads(processedSquads);
  } catch (error) {
    console.error("Error loading squads:", error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
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
  if (squadName.trim() === "") return;
  setLoading(true);
  try {
    const playerObjects = createPlayerObjects(squadPlayersList);
    await squadService.createSquad(squadName, playerObjects);
    const fetchedSquads = await squadService.fetchSquads();
    const processedSquads = processSquads(fetchedSquads);
    setSquads(processedSquads);
    setSquadName("");
    setSquadPlayersList([]);
    setNewSquadPlayer("");
  } catch (error) {
    console.error("Error in createSquad:", error);
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
  if (!editingSquad || squadName.trim() === "") return;
  setLoading(true);
  try {
    const playerObjects = createPlayerObjects(squadPlayersList);
    await squadService.updateSquad(editingSquad.id, squadName, playerObjects);
    const fetchedSquads = await squadService.fetchSquads();
    const processedSquads = processSquads(fetchedSquads);
    setSquads(processedSquads);
    setEditingSquad(null);
    setSquadName("");
    setSquadPlayersList([]);
    setNewSquadPlayer("");
  } catch (error) {
    console.error("Error in updateSquad:", error);
    Sentry.captureException(error);
  } finally {
    setLoading(false);
  }
}