import { useState, useCallback } from 'react';
import { Player, Goal, Squad } from '../types/GameTypes';

export function useGameState() {
  // Player state
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [goalkeeper, setGoalkeeper] = useState<Player | null>(null);
  const [includeGKPlaytime, setIncludeGKPlaytime] = useState<boolean>(true);
  
  // Score state
  const [ourScore, setOurScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [goals, setGoals] = useState<Goal[]>([]);
  
  // Squad state
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [matchSquad, setMatchSquad] = useState<Player[]>([]);

  const handleStartGame = useCallback((players: Player[], gk: Player, includeGKTime: boolean) => {
    setPlayerData(players);
    setGoalkeeper(gk);
    setIncludeGKPlaytime(includeGKTime);
    // Reset game state
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
  }, []);

  const resetGame = useCallback(() => {
    setPlayerData([]);
    setGoalkeeper(null);
    setIncludeGKPlaytime(true);
    setOurScore(0);
    setOpponentScore(0);
    setGoals([]);
    setMatchSquad([]);
  }, []);

  return {
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
  };
}

export default useGameState;