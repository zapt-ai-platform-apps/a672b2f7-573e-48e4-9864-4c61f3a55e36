import React from 'react';
import { useGameManagementLogic } from '../../features/GameManagement/hooks/useGameManagementLogic';
import Header from '../../features/GameManagement/components/Header.jsx';
import PitchVisualization from '../../features/GameManagement/components/PitchVisualization.jsx';
import SubstitutionPanel from '../../features/GameManagement/components/SubstitutionPanel.jsx';
import PlayerGoalsList from '../../features/GameManagement/components/PlayerGoalsList.jsx';
import { EndGameConfirmationModal } from '../../features/GameManagement/components/GameModalAndVisualization.jsx';

/**
 * GameManagementScreen component - main view for managing the game.
 *
 * @component
 * @returns {JSX.Element} The game management screen.
 */
function GameManagementScreen() {
  const {
    playerData,
    setPlayerData,
    isRunning,
    includeGKPlaytime,
    updatePlayerLists,
    onFieldPlayers,
    offFieldPlayers,
    getTotalPlayTime,
    getTimeElapsed,
    toggleTimer,
    handleEndGame,
    ourScore,
    opponentScore,
    showEndGameConfirm,
    confirmEndGame,
    cancelEndGame,
    recordGoalForPlayer
  } = useGameManagementLogic();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 p-4">
      <Header 
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={getTimeElapsed}
        handleEndGame={handleEndGame}
        ourScore={ourScore}
        opponentScore={opponentScore}
      />
      <PitchVisualization />
      <SubstitutionPanel
        playerData={playerData}
        setPlayerData={setPlayerData}
        isRunning={isRunning}
        includeGKPlaytime={includeGKPlaytime}
        updatePlayerLists={updatePlayerLists}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        getTotalPlayTime={getTotalPlayTime}
      />
      <PlayerGoalsList playerData={playerData} recordGoalForPlayer={recordGoalForPlayer} />
      {showEndGameConfirm && (
        <EndGameConfirmationModal
          showEndGameConfirm={showEndGameConfirm}
          confirmEndGame={confirmEndGame}
          cancelEndGame={cancelEndGame}
        />
      )}
    </div>
  );
}

export default GameManagementScreen;