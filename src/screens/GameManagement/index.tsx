import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../hooks/useStateContext';
import GameManagementScreenView from './GameManagementScreenView';
import { Player, Goal } from '../../types/GameTypes';

export default function GameManagementScreen(): JSX.Element {
  // Use state context to get game management data
  const { 
    playerData, 
    timerControls, 
    ourScore, 
    opponentScore, 
    goals, 
    setGoals,
    setOurScore,
    setOpponentScore
  } = useStateContext();
  
  // Local state for component
  const [onFieldPlayers, setOnFieldPlayers] = useState<Player[]>([]);
  const [offFieldPlayers, setOffFieldPlayers] = useState<Player[]>([]);
  
  // Update player lists when playerData changes
  useEffect(() => {
    if (playerData) {
      setOnFieldPlayers(playerData.filter(player => player.isOnField));
      setOffFieldPlayers(playerData.filter(player => !player.isOnField));
    }
  }, [playerData]);

  // Function to calculate total play time for a player
  const getTotalPlayTime = (player: Player): number => {
    return player.totalPlayTime || 0;
  };

  // Handle player click for any player interactions
  const handlePlayerClick = (player: Player): void => {
    console.log("Player clicked:", player);
  };

  return (
    <GameManagementScreenView
      playerData={playerData || []}
      isRunning={timerControls?.isRunning || false}
      ourScore={ourScore || 0}
      opponentScore={opponentScore || 0}
      getTimeElapsed={() => timerControls?.getTimeElapsed() || 0}
      toggleTimer={() => timerControls?.toggleTimer() || false}
      handleEndGame={() => {/* End game functionality */}}
      showEndGameConfirm={false}
      confirmEndGame={() => {/* Confirm end game */}}
      cancelEndGame={() => {/* Cancel end game */}}
      onFieldPlayers={onFieldPlayers}
      offFieldPlayers={offFieldPlayers}
      getTotalPlayTime={getTotalPlayTime}
      showGoalModal={false}
      setShowGoalModal={() => {/* Toggle goal modal */}}
      handlePlayerClick={handlePlayerClick}
      goals={goals}
      setGoals={setGoals}
      setOurScore={setOurScore}
      setOpponentScore={setOpponentScore}
    />
  );
}