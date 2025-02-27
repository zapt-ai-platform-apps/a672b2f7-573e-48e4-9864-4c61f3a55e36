import { Position } from '../../../types/GameTypes';

export interface ExtendedPlayer {
  id: string;
  name: string;
  number?: string;
  isInMatchSquad: boolean;
  isInStartingLineup: boolean; // Added missing property
  totalPlayTime: number;
  isOnField: boolean;
  isGoalkeeper: boolean;
  position: Position;
  playIntervals?: Array<{ 
    start: number; 
    end?: number;
    startTime?: number;
    endTime?: number | null;
    isGoalkeeper?: boolean;
  }>;
}