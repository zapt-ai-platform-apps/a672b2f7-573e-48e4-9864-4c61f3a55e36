import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGameManagementLogic from '../../features/GameManagement/hooks/useGameManagementLogic.js';
import GameManagementMain from '../../features/GameManagement/GameManagementMain.jsx';

function GameManagementScreen() {
  const navigate = useNavigate();
  const {
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    includeGKPlaytime,
    isRunning,
    gameIntervals,
    onFieldPlayers,
    offFieldPlayers,
    showEndGameConfirm,
    updatePlayerLists,
    getTotalPlayTime,
    getTimeElapsed,
    handleEndGame,
    confirmEndGame,
    cancelEndGame,
    toggleTimer
  } = useGameManagementLogic();

  const confirmEndGameHandler = () => {
    confirmEndGame();
    navigate('/summary');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <GameManagementMain
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={getTimeElapsed}
        handleEndGame={handleEndGame}
        ourScore={ourScore}
        setOurScore={setOurScore}
        opponentScore={opponentScore}
        setOpponentScore={setOpponentScore}
        includeGKPlaytime={includeGKPlaytime}
        showEndGameConfirm={showEndGameConfirm}
        confirmEndGame={confirmEndGameHandler}
        cancelEndGame={cancelEndGame}
        playerData={playerData}
        setPlayerData={setPlayerData}
        updatePlayerLists={updatePlayerLists}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
        goals={goals}
        setGoals={setGoals}
        goalkeeper={goalkeeper}
        setGoalkeeper={setGoalkeeper}
      />
    </div>
  );
}

export default GameManagementScreen;