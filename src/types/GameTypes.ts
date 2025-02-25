export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  number?: string;
  totalPlayTime: number;
  isOnField: boolean;
  isGoalkeeper: boolean;
  isInMatchSquad?: boolean;
  isStartingPlayer?: boolean;
  position: Position;
  playIntervals?: Array<{ start: number; end?: number }>;
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