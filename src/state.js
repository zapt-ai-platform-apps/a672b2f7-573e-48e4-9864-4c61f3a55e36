import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [playerData, setPlayerData] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState(true);
  const [ourScore, setOurScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [goals, setGoals] = useState([]);

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
  };

  const resetGame = () => {
    setPlayerData([]);
    setGoalkeeper(null);
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
    setIncludeGKPlaytime(true);
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
        handleStartGame,
        resetGame
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}