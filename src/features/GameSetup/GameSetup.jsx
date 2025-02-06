import React from 'react';
import GameSetupUnified from './GameSetupUnified.jsx';
import useGameSetup from './hooks/useGameSetup.js';
import { useStateContext } from '../../state.jsx';

function GameSetup() {
  const {
    playerName,
    setPlayerName,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
    errorMessage,
    setErrorMessage,
    startingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime
  } = useGameSetup();
  const { handleStartGame } = useStateContext();

  return (
    <GameSetupUnified
      playerName={playerName}
      setPlayerName={setPlayerName}
      addPlayer={addPlayer}
      deletePlayer={deletePlayer}
      toggleStartingPlayer={toggleStartingPlayer}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      startingPlayers={startingPlayers}
      goalkeeper={goalkeeper}
      setGoalkeeper={setGoalkeeper}
      includeGKPlaytime={includeGKPlaytime}
      setIncludeGKPlaytime={setIncludeGKPlaytime}
      handleStartGame={handleStartGame}
    />
  );
}

export default GameSetup;