import React from 'react';

export interface Player {
  id: string | number;
  name: string;
  playTime?: number;
  isOnField?: boolean;
  playIntervals?: { startTime: number; endTime: number | null; isGoalkeeper?: boolean }[];
  [key: string]: unknown;
}

export interface Squad {
  id: string | number;
  name: string;
  players: Player[];
}

export interface Goal {
  team: 'our' | 'opponent';
  scorerName: string | null;
  time: number;
  timestamp: number;
}

export interface StateContextType {
  playerData: Player[];
  setPlayerData: React.Dispatch<React.SetStateAction<Player[]>>;
  goalkeeper: Player | null;
  setGoalkeeper: React.Dispatch<React.SetStateAction<Player | null>>;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: React.Dispatch<React.SetStateAction<boolean>>;
  ourScore: number;
  setOurScore: React.Dispatch<React.SetStateAction<number>>;
  opponentScore: number;
  setOpponentScore: React.Dispatch<React.SetStateAction<number>>;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  selectedSquad: Squad | null;
  setSelectedSquad: React.Dispatch<React.SetStateAction<Squad | null>>;
  matchSquad: Player[];
  setMatchSquad: React.Dispatch<React.SetStateAction<Player[]>>;
  handleStartGame: (players: Player[], gk: Player, includeGKTime: boolean) => void;
  resetGame: () => void;
}

export const StateContext = React.createContext<StateContextType>({} as StateContextType);