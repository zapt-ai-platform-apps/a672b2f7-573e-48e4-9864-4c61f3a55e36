import { createContext } from 'react';
import { Player, Goal, Squad } from '../types/GameTypes';

export interface StateContextType {
  // Squad management
  selectedSquad: Player[] | Squad;
  setSelectedSquad: (squad: Player[] | Squad) => void;
  
  // Match squad for the current game
  matchSquad: Player[];
  setMatchSquad: (players: Player[]) => void;
  
  // Goalkeeper settings
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  
  // Game management properties
  playerData: Player[];
  setPlayerData: React.Dispatch<React.SetStateAction<Player[]>>;
  ourScore: number;
  setOurScore: React.Dispatch<React.SetStateAction<number>>;
  opponentScore: number;
  setOpponentScore: React.Dispatch<React.SetStateAction<number>>;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  includeGKPlaytime: boolean;
  resetGame: () => void;
  handleStartGame: (players: Player[], goalkeeper: Player, includeGKPlaytime: boolean) => void;
}

// Default values to avoid null checks
const defaultContext: StateContextType = {
  selectedSquad: [],
  setSelectedSquad: () => {},
  
  matchSquad: [],
  setMatchSquad: () => {},
  
  goalkeeper: null,
  setGoalkeeper: () => {},
  
  playerData: [],
  setPlayerData: () => {},
  ourScore: 0,
  setOurScore: () => {},
  opponentScore: 0,
  setOpponentScore: () => {},
  goals: [],
  setGoals: () => {},
  includeGKPlaytime: false,
  resetGame: () => {},
  handleStartGame: () => {},
};

export const StateContext = createContext<StateContextType>(defaultContext);