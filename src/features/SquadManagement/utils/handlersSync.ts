import * as Sentry from "@sentry/browser";
import { processSquad } from "../hooks/squadManagementHelper";

export function addSquadPlayer(
  newSquadPlayer: string,
  squadPlayersList: string[],
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void
): void {
  const trimmedPlayer = newSquadPlayer.trim();
  if (trimmedPlayer !== "") {
    setSquadPlayersList([...squadPlayersList, trimmedPlayer]);
    setNewSquadPlayer("");
  }
}

export function deleteSquadPlayer(
  player: string,
  squadPlayersList: string[],
  setSquadPlayersList: (list: string[]) => void
): void {
  setSquadPlayersList(squadPlayersList.filter((p) => p !== player));
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
  if (typeof players === "string") {
    try {
      players = JSON.parse(players);
    } catch (error) {
      console.error("Error parsing squad.players:", error);
      Sentry.captureException(error);
      players = [];
    }
  }
  const playerNames = Array.isArray(players)
    ? players.map((player: any) =>
        typeof player === "string" ? player : player.name
      )
    : [];
  setSquadPlayersList(playerNames);
  setNewSquadPlayer("");
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
  if (typeof players === "string") {
    try {
      players = JSON.parse(players);
    } catch (error) {
      console.error("Error parsing processedSquad.players:", error);
      Sentry.captureException(error);
      players = [];
    }
  }
  const playerNames = Array.isArray(players)
    ? players.map((player: any) =>
        typeof player === "string" ? player : player.name
      )
    : [];
  setSquadPlayersList(playerNames);
  setNewSquadPlayer("");
}

export function cancelEditing(
  setEditingSquad: (squad: any) => void,
  setSquadName: (name: string) => void,
  setSquadPlayersList: (list: string[]) => void,
  setNewSquadPlayer: (player: string) => void
): void {
  setEditingSquad(null);
  setSquadName("");
  setSquadPlayersList([]);
  setNewSquadPlayer("");
}