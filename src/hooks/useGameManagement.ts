import { useState } from 'react';
import { Player, Goal } from '../types/GameTypes';

export function useGameManagement() {
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [currentGameState, setCurrentGameState] = useState<any>(null);
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [ourScore, setOurScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(false);

  const resetGame = () => {
    setPlayerData([]);
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
  };

  const handleStartGame = (players: Player[], goalkeeperPlayer: Player, includeGKPlaytimeValue: boolean) => {
    setPlayerData(players);
    setGoalkeeper(goalkeeperPlayer);
    setIncludeGKPlaytime(includeGKPlaytimeValue);
  };

  return {
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
  };
}