import { TimeInterval } from './timeUtils';

export interface Goal {
  id: string;
  playerId: string;
  timestamp: number;
  period?: number;
}

export interface Player {
  id: string;
  name: string;
  isInMatchSquad: boolean;
  isInStartingLineup: boolean;
  position: string | null;
  isGoalkeeper: boolean;
  playIntervals: TimeInterval[];
  goals: Goal[];
}

export const createPlayer = (id: string, name: string): Player => {
  return {
    id,
    name,
    isInMatchSquad: false,
    isInStartingLineup: false,
    position: null,
    isGoalkeeper: false,
    playIntervals: [],
    goals: []
  };
};

export const toggleMatchSquad = (player: Player): Player => {
  const isInMatchSquad = !player.isInMatchSquad;
  return {
    ...player,
    isInMatchSquad,
    // Remove from starting lineup if removed from match squad
    isInStartingLineup: isInMatchSquad ? player.isInStartingLineup : false
  };
};

export const toggleStartingLineup = (player: Player): Player => {
  // Can only be in starting lineup if in match squad
  if (!player.isInMatchSquad) return player;
  
  return {
    ...player,
    isInStartingLineup: !player.isInStartingLineup
  };
};