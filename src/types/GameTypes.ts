export interface Player {
  id: string | number;
  name: string;
  playIntervals?: Array<{
    startTime: number;
    endTime: number | null;
    isGoalkeeper?: boolean;
  }>;
  isOnField: boolean;
  isGoalkeeper: boolean;
  position: { x: number; y: number };
  isStartingPlayer?: boolean;
  isInMatchSquad?: boolean;
  playTime?: number; // Added to fix TypeScript errors
  lastStart?: number; // Added to fix TypeScript errors
}

export interface Goal {
  team: 'our' | 'opponent';
  scorerName: string;
  timestamp: number;
}

export interface Squad {
  id?: number | string;
  name: string;
  players: Player[];
}

export interface StateProviderProps {
  children: React.ReactNode;
}

export interface Interval {
  startTime: number;
  endTime: number | null;
}