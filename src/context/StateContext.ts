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
  
  // Timer controls
  timerControls: {
    now: number;
    startUITimer: () => void;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    getTimeElapsed: () => number;
    timeElapsed: number;
    gameIntervals: Array<{ startTime: number; endTime?: number }>;
    isRunning: boolean;
    startGame: () => void;
    pauseGame: () => void;
    toggleTimer: () => boolean;
  };
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
  
  timerControls: {
    now: 0,
    startUITimer: () => {},
    startTimer: () => {},
    stopTimer: () => {},
    resetTimer: () => {},
    getTimeElapsed: () => 0,
    timeElapsed: 0,
    gameIntervals: [],
    isRunning: false,
    startGame: () => {},
    pauseGame: () => {},
    toggleTimer: () => false
  }
};

export const StateContext = createContext<StateContextType>(defaultContext);