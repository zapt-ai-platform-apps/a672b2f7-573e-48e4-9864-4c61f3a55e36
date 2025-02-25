import React from 'react';
import { Player, Goal, Squad } from '../types/GameTypes';

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