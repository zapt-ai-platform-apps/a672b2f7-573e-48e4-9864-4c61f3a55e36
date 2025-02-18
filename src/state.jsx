import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

/**
 * Provides global state context for the app.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The provider component.
 */
export function StateProvider({ children }) {
  const [playerData, setPlayerData] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);
  const [ourScore, setOurScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [goals, setGoals] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState(null);
  const [matchSquad, setMatchSquad] = useState([]);

  const handleStartGame = (players, gk, includeGKTime) => {
    setPlayerData(
      players.map((player) => {
        const isStarting = player.isStartingPlayer;
        const isGoalkeeperPlayer = player.name === gk;
        return {
          name: player.name,
          playIntervals: [],
          isOnField: isStarting,
          isGoalkeeper: isGoalkeeperPlayer,
          totalPlayTime: 0,
          position: { x: null, y: null }
        };
      })
    );
    setGoalkeeper(gk);
    setIncludeGKPlaytime(includeGKTime);
    setMatchSquad(players);
  };

  const resetGame = () => {
    setPlayerData([]);
    setGoalkeeper(null);
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
    setIncludeGKPlaytime(true);
    setSelectedSquad(null);
    setMatchSquad([]);
  };

  return (
    <StateContext.Provider
      value={{
        playerData,
        setPlayerData,
        goalkeeper,
        setGoalkeeper,
        includeGKPlaytime,
        setIncludeGKPlaytime,
        ourScore,
        setOurScore,
        opponentScore,
        setOpponentScore,
        goals,
        setGoals,
        selectedSquad,
        setSelectedSquad,
        matchSquad,
        setMatchSquad,
        handleStartGame,
        resetGame
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

/**
 * Custom hook to access the global state context.
 *
 * @returns {Object} The state context value.
 */
export function useStateContext() {
  return useContext(StateContext);
}