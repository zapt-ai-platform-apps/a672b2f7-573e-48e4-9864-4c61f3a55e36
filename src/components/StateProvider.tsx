import React from 'react';
import { StateContext } from '../context/StateContext';
import { useGameState } from '../hooks/useGameState';
import { StateProviderProps } from '../types/GameTypes';

export function StateProvider({ children }: StateProviderProps): JSX.Element {
  const gameState = useGameState();

  return (
    <StateContext.Provider value={gameState}>
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;