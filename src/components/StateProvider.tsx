import React, { useState, ReactNode } from 'react';
import { StateContext } from '../context/StateContext';
import { Player } from '../types/GameTypes';

interface StateProviderProps {
  children: ReactNode;
}

export default function StateProvider({ children }: StateProviderProps): JSX.Element {
  // Squad management
  const [selectedSquad, setSelectedSquad] = useState<Player[]>([]);
  
  // Match squad for the current game
  const [matchSquad, setMatchSquad] = useState<Player[]>([]);
  
  // Goalkeeper settings
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  
  // Game state
  const [currentGameState, setCurrentGameState] = useState<any>(null);

  // Update matchSquad whenever selectedSquad changes
  React.useEffect(() => {
    console.log('selectedSquad updated in StateProvider:', selectedSquad);
    // Only update matchSquad if we're setting a new squad (not clearing it)
    if (selectedSquad && selectedSquad.length > 0) {
      setMatchSquad(selectedSquad);
      console.log('matchSquad updated in StateProvider:', selectedSquad);
    }
  }, [selectedSquad]);

  return (
    <StateContext.Provider
      value={{
        selectedSquad,
        setSelectedSquad,
        matchSquad,
        setMatchSquad,
        goalkeeper,
        setGoalkeeper,
        currentGameState,
        setCurrentGameState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}