import { Position } from '../../types/GameTypes';

export interface SummaryPlayer {
  id: string;
  name: string;
  totalPlayTime: number;
  isGoalkeeper?: boolean;
  isOnField?: boolean;
  position: Position; // Updated to use Position type instead of string
}

export interface Goal {
  id: string;
  playerId: string;
  playerName: string;
  minute: number;
  teamScored: 'home' | 'away';
}

export interface GameResult {
  homeScore: number;
  awayScore: number;
  goals: Goal[];
  players: SummaryPlayer[];
  duration: number;
}