import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameSetupView from './GameSetupView';
import useGameSetup from '../../hooks/useGameSetup';
import { useStateContext } from '../../state';
import useMatchSquad from '../../hooks/useMatchSquad';

function GameSetupContent() {
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
  const { matchSquadPlayers, toggleMatchPlayer } = useMatchSquad();

  return (
    <GameSetupView
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
      matchSquadPlayers={matchSquadPlayers}
      toggleMatchPlayer={toggleMatchPlayer}
    />
  );
}

export default GameSetupContent;