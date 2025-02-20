import { parsePlayers } from "../../../../utils/parsePlayers";

export interface Player {
  id: string;
  name: string;
  position?: string;
  number?: number;
}

export function initializePlayers(rawData: string): Player[] {
  try {
    const players = parsePlayers(rawData) as Player[];
    return players;
  } catch (error) {
    console.error("Failed to initialize players", error);
    return [];
  }
}