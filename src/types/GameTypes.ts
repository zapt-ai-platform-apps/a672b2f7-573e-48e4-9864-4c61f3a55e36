export interface Player {
  id?: number;
  name: string;
  playIntervals?: { startTime: number; endTime: number | null }[];
  isOnField: boolean;
  isGoalkeeper: boolean;
  totalPlayTime: number;
  position: { x: number | null; y: number | null };
  isStartingPlayer?: boolean;
  isInMatchSquad?: boolean;
}

export interface Goal {
  team: 'our' | 'opponent';
  scorerName: string;
  timestamp?: number;
}

export interface Squad {
  id?: number | string;
  name: string;
  players: Player[];
}

export interface RawPlayer {
  name: string;
  isStartingPlayer?: boolean;
}

export interface StateProviderProps {
  children: React.ReactNode;
}