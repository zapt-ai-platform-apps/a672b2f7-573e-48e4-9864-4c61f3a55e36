import { Player } from '../shared/models/player';

export interface Goal {
  id: string;
  minute: number;
  scorer: string;
  team: 'our' | 'opponent';
  scorerId?: string;
}

export interface GoalData {
  id: string;
  team: 'our' | 'opponent';
  minute: number;
  scorer: string;
  timestamp: number;
  scorerId?: string;
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
  id: string;
  startTime: number;
  endTime: number | null;
  duration: number;
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