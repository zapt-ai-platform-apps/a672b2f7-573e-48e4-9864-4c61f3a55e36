import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameManagementLogic from '../../features/GameManagement/hooks/useGameManagementLogic.js';
import { Header, GameActions, EndGameConfirmationModal, PitchVisualization } from '../../features/GameManagement/components/GameManagementComponents.jsx';
import PlayerList from '../../features/GameManagement/components/PlayerList.jsx';

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
    toggleTimer,
    assignGoalkeeper,
    handleRemoveLastGoal,
    setShowGoalModal,
    setShowAddPlayerModal,
    handleIncreasePlayers,
    handleDecreasePlayers
  } = useGameManagementLogic();

  const [showPitch, setShowPitch] = useState(false);

  const confirmEndGameHandler = () => {
    confirmEndGame();
    navigate('/summary');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-brand-500 dark:text-brand-400">Game Management</h1>
        <Header 
          isRunning={isRunning}
          toggleTimer={toggleTimer}
          getTimeElapsed={getTimeElapsed}
          handleEndGame={handleEndGame}
          ourScore={ourScore}
          opponentScore={opponentScore}
        />
        {!includeGKPlaytime && (
          <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">
            Note: Playtime for goalkeepers is not tracked.
          </p>
        )}
        <button
          className="mb-4 px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-all duration-300 ease-in-out-custom cursor-pointer"
          onClick={() => setShowPitch(!showPitch)}
        >
          {showPitch ? 'Hide Pitch' : 'Show Pitch'}
        </button>
        {showPitch && <PitchVisualization />}
        <EndGameConfirmationModal
          showEndGameConfirm={showEndGameConfirm}
          confirmEndGame={confirmEndGameHandler}
          cancelEndGame={cancelEndGame}
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <PlayerList 
            players={onFieldPlayers} 
            title="Players on Field" 
            message="Select a player to sub off"
            getTotalPlayTime={getTotalPlayTime}
            handlePlayerClick={(player) => console.log('Sub off:', player.name)}
          />
          <PlayerList 
            players={offFieldPlayers} 
            title="Players Off Field" 
            message="Select a player to sub on"
            getTotalPlayTime={getTotalPlayTime}
            handlePlayerClick={(player) => console.log('Sub on:', player.name)}
          />
        </div>
        <GameActions
          assignGoalkeeper={assignGoalkeeper}
          handleRemoveLastGoal={handleRemoveLastGoal}
          setShowGoalModal={setShowGoalModal}
          setShowAddPlayerModal={setShowAddPlayerModal}
          handleIncreasePlayers={handleIncreasePlayers}
          handleDecreasePlayers={handleDecreasePlayers}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}

export default GameManagementScreen;