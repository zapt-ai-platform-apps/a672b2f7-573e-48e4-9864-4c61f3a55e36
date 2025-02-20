import React, { useState } from 'react';
import { StateContext } from '../context/StateContext';
import { parsePlayers } from '../utils/parsePlayers';
import { Player, RawPlayer, Goal, Squad, StateProviderProps } from '../types/GameTypes';

export function StateProvider({ children }: StateProviderProps): JSX.Element {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [goalkeeper, setGoalkeeper] = useState<string | null>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  const [ourScore, setOurScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [matchSquad, setMatchSquad] = useState<Player[]>([]);

  const handleStartGame = (players: string | RawPlayer[], gk: string, includeGKTime: boolean): void => {
    const safePlayers: RawPlayer[] = Array.isArray(players)
      ? players
      : typeof players === 'string'
      ? (parsePlayers(players) as RawPlayer[])
      : [];
    setPlayerData(
      safePlayers.map((player: RawPlayer) => {
        const isStarting = player.isStartingPlayer ?? false;
        const isGoalkeeperPlayer = player.name === gk;
        return {
          name: player.name,
          playIntervals: [],
          isOnField: isStarting,
          isGoalkeeper: isGoalkeeperPlayer,
          totalPlayTime: 0,
          position: { x: null, y: null },
          isStartingPlayer: isStarting
        } as Player;
      })
    );
    setGoalkeeper(gk);
    setIncludeGKPlaytime(includeGKTime);
    setMatchSquad(
      safePlayers.map((player: RawPlayer) => ({
        name: player.name,
        playIntervals: [] as number[],
        isOnField: player.isStartingPlayer ?? false,
        isGoalkeeper: player.name === gk,
        totalPlayTime: 0,
        position: { x: null, y: null },
        isStartingPlayer: player.isStartingPlayer ?? false,
      })) as Player[]
    );
  };

  const resetGame = (): void => {
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