import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { Player, Goal, Squad } from '../types/GameTypes';
import useGameManagement from '../hooks/useGameManagement';
import useGameTimer from '../hooks/useGameTimer';

const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  
  // Squad management
  const [selectedSquad, setSelectedSquad] = useState<Player[] | Squad>([]);
  const [matchSquad, setMatchSquad] = useState<Player[]>([]);
  
  // Game management
  const gameManagement = useGameManagement();
  
  // Use separate timer hook to get timer controls
  const timerControls = useGameTimer();
  
  // Start a new game with selected players
  const handleStartGame = useCallback((
    players: Player[], 
    goalkeeper: Player, 
    includeGKPlaytime: boolean
  ) => {
    if (gameManagement.handleStartGame) {
      gameManagement.handleStartGame(players, goalkeeper, includeGKPlaytime);
      navigate('/game-management', {
        state: {
          players,
          goalkeeper,
          includeGKPlaytime
        }
      });
    } else {
      console.error('handleStartGame function not available');
    }
  }, [gameManagement, navigate]);
  
  // Reset game state
  const resetGame = useCallback(() => {
    if (gameManagement.resetGame) {
      gameManagement.resetGame();
    } else {
      console.error('resetGame function not available');
    }
  }, [gameManagement]);
  
  return (
    <StateContext.Provider
      value={{
        // Squad management
        selectedSquad,
        setSelectedSquad,
        matchSquad,
        setMatchSquad,
        
        // Game management
        goalkeeper: gameManagement.goalkeeper,
        setGoalkeeper: gameManagement.setGoalkeeper,
        playerData: gameManagement.playerData,
        setPlayerData: gameManagement.setPlayerData,
        ourScore: gameManagement.ourScore,
        setOurScore: gameManagement.setOurScore,
        opponentScore: gameManagement.opponentScore,
        setOpponentScore: gameManagement.setOpponentScore,
        goals: gameManagement.goals,
        setGoals: gameManagement.setGoals,
        includeGKPlaytime: gameManagement.includeGKPlaytime,
        
        // Game functions
        resetGame,
        handleStartGame,
        
        // Timer controls
        timerControls
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;