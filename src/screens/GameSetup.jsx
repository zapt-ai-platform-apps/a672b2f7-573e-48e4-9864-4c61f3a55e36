import React from 'react';
import GameIntro from './GameSetup/GameIntro';
import PlayerManager from './GameSetup/PlayerManager';
import StartGameButton from './GameSetup/StartGameButton';
import GoalkeeperSettings from '../components/GoalkeeperSettings';
import ErrorMessage from '../components/ErrorMessage';
import useGameSetup from '../hooks/useGameSetup';
import { useStateContext } from '../state';

function GameSetup() {
  const { handleStartGame } = useStateContext();

  const {
    playerName,
    setPlayerName,
    players,
    setPlayers,
    startingPlayersCount,
    setStartingPlayersCount,
    errorMessage,
    setErrorMessage,
    startingPlayers,
    setStartingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer
  } = useGameSetup();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        <GameIntro />
        <PlayerManager
          playerName={playerName}
          setPlayerName={setPlayerName}
          players={players}
          addPlayer={addPlayer}
          deletePlayer={deletePlayer}
          toggleStartingPlayer={toggleStartingPlayer}
          startingPlayersCount={startingPlayersCount}
        />
        {startingPlayersCount > 0 && (
          <GoalkeeperSettings
            startingPlayers={startingPlayers}
            goalkeeper={goalkeeper}
            setGoalkeeper={setGoalkeeper}
            includeGKPlaytime={includeGKPlaytime}
            setIncludeGKPlaytime={setIncludeGKPlaytime}
          />
        )}
        <ErrorMessage errorMessage={errorMessage} />
        <StartGameButton
          players={players}
          startingPlayersCount={startingPlayersCount}
          goalkeeper={goalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setErrorMessage={setErrorMessage}
          onStartGame={handleStartGame}
        />
      </div>
    </div>
  );
}

export default GameSetup;