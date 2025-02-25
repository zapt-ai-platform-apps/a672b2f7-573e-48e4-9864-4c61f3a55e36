import React from 'react';
import { StateContext } from '../context/StateContext';
import { useSquadManagement } from '../hooks/useSquadManagement';
import { useGameManagement } from '../hooks/useGameManagement';

interface StateProviderProps {
  children: React.ReactNode;
}

export default function StateProvider({ children }: StateProviderProps): JSX.Element {
  const { selectedSquad, setSelectedSquad, matchSquad, setMatchSquad } = useSquadManagement();
  const {
    goalkeeper,
    setGoalkeeper,
    currentGameState,
    setCurrentGameState,
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
  } = useGameManagement();

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
}