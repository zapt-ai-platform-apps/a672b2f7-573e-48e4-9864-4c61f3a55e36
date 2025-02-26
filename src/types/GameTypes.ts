export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  number?: string;
  totalPlayTime: number;
  playTime?: number;
  lastStart?: number;
  isOnField: boolean;
  isGoalkeeper: boolean;
  isInMatchSquad?: boolean;
  isStartingPlayer?: boolean;
  isInStartingLineup?: boolean;
  // Position is now a consistent object type
  position: Position;
  // Add missing properties needed by Game Summary
  status?: string;
  minutesPlayed?: number;
  playIntervals?: Array<{ 
    start: number; 
    end?: number;
    startTime?: number;
    endTime?: number | null;
    isGoalkeeper?: boolean;
  }>;
  // Adding the missing selected property to fix TypeScript errors
  selected?: boolean;
}

export interface Goal {
  team: 'our' | 'opponent';
  scorerName: string;
  time: number;
  isOpponentGoal?: boolean;
}

export interface GameState {
  playerData: Player[];
  ourScore: number;
  opponentScore: number;
  goals: Goal[];
  includeGKPlaytime: boolean;
  showAddSubPanel: boolean;
  goalkeeper?: string;
  selectedSquad?: Squad;
}

export interface Squad {
  id: string;
  name: string;
  players: Player[];
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

// Add StateProviderProps interface that was missing
export interface StateProviderProps {
  children: React.ReactNode;
}