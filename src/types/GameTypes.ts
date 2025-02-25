export interface Position {
  x: number | null;
  y: number | null;
}

export interface Player {
  id: string;
  name: string;
  number?: string;
  totalPlayTime: number;
  playTime?: number; // Added to fix timeOperations references
  lastStart?: number; // Added to fix gamePlayerOperations references
  isOnField: boolean;
  isGoalkeeper: boolean;
  isInMatchSquad?: boolean;
  isStartingPlayer?: boolean;
  isInStartingLineup?: boolean; // Added missing property
  // Allow position to be either a Position object or a string
  position: Position | string;
  // Add missing properties needed by Game Summary
  status?: string;
  minutesPlayed?: number;
  playIntervals?: Array<{ 
    start: number; 
    end?: number;
    startTime?: number; // Added to support goalkeeperModel
    endTime?: number | null; // Added to support goalkeeperModel
    isGoalkeeper?: boolean;
  }>;
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