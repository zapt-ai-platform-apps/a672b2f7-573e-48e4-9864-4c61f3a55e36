import React from 'react';

export interface StateContextType {
  playerData: any[];
  setPlayerData: React.Dispatch<React.SetStateAction<any[]>>;
  goalkeeper: any;
  setGoalkeeper: React.Dispatch<React.SetStateAction<any>>;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: React.Dispatch<React.SetStateAction<boolean>>;
  ourScore: number;
  setOurScore: React.Dispatch<React.SetStateAction<number>>;
  opponentScore: number;
  setOpponentScore: React.Dispatch<React.SetStateAction<number>>;
  goals: any[];
  setGoals: React.Dispatch<React.SetStateAction<any[]>>;
  selectedSquad: any;
  setSelectedSquad: React.Dispatch<React.SetStateAction<any>>;
  matchSquad: any[];
  setMatchSquad: React.Dispatch<React.SetStateAction<any[]>>;
  handleStartGame: (players: any[], gk: any, includeGKTime: boolean) => void;
  resetGame: () => void;
}

export const StateContext = React.createContext<StateContextType>({} as StateContextType);