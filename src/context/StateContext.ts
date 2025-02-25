import { createContext } from 'react';
import { Player } from '../types/GameTypes';

export interface StateContextType {
  // Squad management
  selectedSquad: Player[];
  setSelectedSquad: (squad: Player[]) => void;
  
  // Match squad for the current game
  matchSquad: Player[];
  setMatchSquad: (players: Player[]) => void;
  
  // Goalkeeper settings
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
  
  // Game state
  currentGameState: any; // Replace with proper type
  setCurrentGameState: (state: any) => void;
  
  // Other state properties can be added as needed
}

// Default values to avoid null checks
const defaultContext: StateContextType = {
  selectedSquad: [],
  setSelectedSquad: () => {},
  
  matchSquad: [],
  setMatchSquad: () => {},
  
  goalkeeper: null,
  setGoalkeeper: () => {},
  
  currentGameState: null,
  setCurrentGameState: () => {},
};

export const StateContext = createContext<StateContextType>(defaultContext);