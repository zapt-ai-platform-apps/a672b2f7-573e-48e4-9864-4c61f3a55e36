import React, { useState, ReactNode } from 'react';
import { StateContext } from '../context/StateContext';
import { parsePlayers } from '../utils/parsePlayers';

interface StateProviderProps {
  children: ReactNode;
}

export function StateProvider({ children }: StateProviderProps): JSX.Element {
  const [playerData, setPlayerData] = useState<any[]>([]);
  const [goalkeeper, setGoalkeeper] = useState<any>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  const [ourScore, setOurScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [goals, setGoals] = useState<any[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<any>(null);
  const [matchSquad, setMatchSquad] = useState<any[]>([]);

  const handleStartGame = (players: any[], gk: any, includeGKTime: boolean) => {
    const safePlayers = Array.isArray(players)
      ? players
      : typeof players === 'string'
      ? parsePlayers(players)
      : [];
    setPlayerData(
      safePlayers.map((player: any) => {
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
    setMatchSquad(safePlayers);
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