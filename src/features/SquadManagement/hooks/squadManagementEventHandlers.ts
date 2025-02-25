import {
  addSquadPlayer,
  deleteSquadPlayer,
  createSquad as createSquadHandler,
  updateSquad as updateSquadHandler,
  selectSquad,
  editSquad,
  cancelEditing
} from '../utils/squadManagementHandlers';

export function handleAddSquadPlayer(
  newSquadPlayer: string,
  squadPlayersList: string[],
  setSquadPlayersList: React.Dispatch<React.SetStateAction<string[]>>,
  setNewSquadPlayer: React.Dispatch<React.SetStateAction<string>>
): void {
  addSquadPlayer(newSquadPlayer, squadPlayersList, setSquadPlayersList, setNewSquadPlayer);
}

export function handleDeleteSquadPlayer(
  player: string,
  squadPlayersList: string[],
  setSquadPlayersList: React.Dispatch<React.SetStateAction<string[]>>
): void {
  deleteSquadPlayer(player, squadPlayersList, setSquadPlayersList);
}

export async function handleCreateSquad(
  squadName: string,
  squadPlayersList: string[],
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSquads: React.Dispatch<React.SetStateAction<any>>,
  setSquadName: React.Dispatch<React.SetStateAction<string>>,
  setSquadPlayersList: React.Dispatch<React.SetStateAction<string[]>>,
  setNewSquadPlayer: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
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

export async function handleUpdateSquad(
  editingSquad: any,
  squadName: string,
  squadPlayersList: string[],
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSquads: React.Dispatch<React.SetStateAction<any>>,
  setEditingSquad: React.Dispatch<React.SetStateAction<any>>,
  setSquadName: React.Dispatch<React.SetStateAction<string>>,
  setSquadPlayersList: React.Dispatch<React.SetStateAction<string[]>>,
  setNewSquadPlayer: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
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

export function handleSelectSquad(
  squad: any,
  setSquadName: React.Dispatch<React.SetStateAction<string>>,
  setSquadPlayersList: React.Dispatch<React.SetStateAction<string[]>>,
  setNewSquadPlayer: React.Dispatch<React.SetStateAction<string>>,
  setSelectedSquad: React.Dispatch<React.SetStateAction<any>>
): void {
  selectSquad(squad, setSquadName, setSquadPlayersList, setNewSquadPlayer, setSelectedSquad);
}

export function handleEditSquad(
  squad: any,
  setEditingSquad: React.Dispatch<React.SetStateAction<any>>,
  setSelectedSquad: React.Dispatch<React.SetStateAction<any>>,
  setSquadName: React.Dispatch<React.SetStateAction<string>>,
  setSquadPlayersList: React.Dispatch<React.SetStateAction<string[]>>,
  setNewSquadPlayer: React.Dispatch<React.SetStateAction<string>>
): void {
  editSquad(squad, setEditingSquad, setSelectedSquad, setSquadName, setSquadPlayersList, setNewSquadPlayer);
}

export function cancelEdit(
  setEditingSquad: React.Dispatch<React.SetStateAction<any>>,
  setSquadName: React.Dispatch<React.SetStateAction<string>>,
  setSquadPlayersList: React.Dispatch<React.SetStateAction<string[]>>,
  setNewSquadPlayer: React.Dispatch<React.SetStateAction<string>>
): void {
  cancelEditing(setEditingSquad, setSquadName, setSquadPlayersList, setNewSquadPlayer);
}