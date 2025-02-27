// Define and export all core game types in one place

export interface Position {
  x: number;
  y: number;
}

export interface PlayInterval {
  start: number;
  end?: number;
  isGoalkeeper?: boolean;
  startTime?: number; // For backward compatibility
  endTime?: number;   // For backward compatibility
}

export interface Player {
  id: string;
  name: string;
  position: Position;
  isOnField: boolean;
  isGoalkeeper: boolean;
  isInMatchSquad: boolean;
  isInStartingLineup: boolean;
  isStartingPlayer?: boolean;
  playTime?: number;
  lastStart?: number;
  totalPlayTime: number;
  playIntervals: PlayInterval[];
  selected?: boolean;
  status?: string;
}

export interface Goal {
  team: 'our' | 'opponent';
  scorerName: string | null;
  time: number;
  id?: string;
  minute?: number;
  scorer?: string;
  scorerId?: string;
  timestamp?: number;
}

export interface GoalData {
  id: string;
  team: 'our' | 'opponent';
  minute: number;
  scorer: string;
  timestamp: number;
  scorerId?: string;
}

export interface Squad {
  id: string;
  name: string;
  players: Player[];
  createdAt?: string;
  userId?: string;
}

export interface GameState {
  isActive: boolean;
  isPaused: boolean;
  startTime: number;
  elapsedTime: number;
  ourScore: number;
  opponentScore: number;
  currentMinute: number;
  players: Player[];
  goals: GoalData[];
  substitutions: Substitution[];
  isGameStarted: boolean;
  isGameFinished: boolean;
  intervals: TimeInterval[];
  currentInterval: TimeInterval | null;
}

export interface Substitution {
  id: string;
  playerInId: string;
  playerOutId: string;
  minute: number;
  timestamp: number;
}

export interface TimeInterval {
  id?: string;
  startTime: number;
  endTime: number | null;
  duration?: number;
  start?: number; // For backward compatibility
  end?: number;   // For backward compatibility
}

export interface GameConfig {
  matchLength: number;
  numberOfPlayers: number;
  rotationInterval: number;
  goalkeeperId?: string;
  manualRotation: boolean;
  enableRotation: boolean;
  enableGoalkeeper: boolean;
  goalkeepersPlayAll: boolean;
}

export interface GameSetupState {
  squad: Player[];
  participants: Player[];
  nonParticipants: Player[];
  matchLength: number;
  numberOfPlayers: number;
  rotationInterval: number;
  goalkeeperId?: string;
  manualRotation: boolean;
  enableRotation: boolean;
  enableGoalkeeper: boolean;
  goalkeepersPlayAll: boolean;
}

export interface TimerControls {
  start: () => void;
  pause: () => void;
  reset: () => void;
  addTime: (seconds: number) => void;
  getElapsedSeconds: () => number;
  isRunning: () => boolean;
}

export interface GameSummary {
  duration: number;
  ourScore: number;
  opponentScore: number;
  result: 'win' | 'loss' | 'draw';
  players: PlayerSummary[];
  goals: GoalData[];
  substitutions: Substitution[];
}

export interface PlayerSummary {
  id: string;
  name: string;
  totalPlaytime: number;
  playtimePercentage: number;
  goals: number;
}

export interface TimerState {
  isRunning: boolean;
  startTime: number | null;
  elapsedTime: number;
}