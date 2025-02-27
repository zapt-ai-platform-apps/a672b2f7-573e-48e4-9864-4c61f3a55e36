import React, { useState } from 'react';
import { StateContext } from '../context/StateContext';
import { Player, Goal, Squad } from '../types/GameTypes';
import useGameManagement from '../hooks/useGameManagement';
import useGameTimer from '../hooks/useGameTimer';

interface StateProviderProps {
  children: React.ReactNode;
}

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [selectedSquad, setSelectedSquad] = useState<Player[] | Squad>([]);
  const [matchSquad, setMatchSquad] = useState<Player[]>([]);
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  
  // Get game management state and functions
  const {
    playerData,
    setPlayerData,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    handleStartGame,
    resetGame
  } = useGameManagement();
  
  // Set up timer controls
  const timerControls = useGameTimer();
  
  return (
    <StateContext.Provider
      value={{
        // Squad management
        selectedSquad,
        setSelectedSquad,
        
        // Match squad for the current game
        matchSquad,
        setMatchSquad,
        
        // Goalkeeper settings
        goalkeeper,
        setGoalkeeper,
        
        // Game management properties
        playerData,
        setPlayerData,
        ourScore,
        setOurScore,
        opponentScore,
        setOpponentScore,
        goals,
        setGoals,
        includeGKPlaytime,
        resetGame,
        handleStartGame,
        
        // Timer controls
        timerControls,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;