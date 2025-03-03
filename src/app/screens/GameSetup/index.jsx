import React from 'react';
import GameIntro from './GameIntro.jsx';
import PlayerManager from './PlayerManager.jsx';
import StartGameButton from './StartGameButton.jsx';
import GoalkeeperSettings from '@/modules/players/ui/GoalkeeperSettings.jsx';
import ErrorMessage from '@/shared/components/ErrorMessage.jsx';
import useGameSetup from '@/app/hooks/useGameSetup';

function GameSetup() {
  const {
    playerName,
    setPlayerName,
    players,
    startingPlayersCount,
    errorMessage,
    setErrorMessage,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
  } = useGameSetup();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <GameIntro />
      <ErrorMessage errorMessage={errorMessage} />
      <PlayerManager
        playerName={playerName}
        setPlayerName={setPlayerName}
        players={players}
        addPlayer={addPlayer}
        deletePlayer={deletePlayer}
        toggleStartingPlayer={toggleStartingPlayer}
        startingPlayersCount={startingPlayersCount}
      />
      <GoalkeeperSettings
        startingPlayers={players.filter((p) => p.isStartingPlayer)}
        goalkeeper={goalkeeper}
        setGoalkeeper={setGoalkeeper}
        includeGKPlaytime={includeGKPlaytime}
        setIncludeGKPlaytime={setIncludeGKPlaytime}
      />
      <StartGameButton
        players={players}
        startingPlayersCount={startingPlayersCount}
        goalkeeper={goalkeeper}
        includeGKPlaytime={includeGKPlaytime}
        setErrorMessage={setErrorMessage}
        onStartGame={(players, goalkeeper, includeGKPlaytime) => {
          console.log("Game started", { players, goalkeeper, includeGKPlaytime });
        }}
      />
    </div>
  );
}

export default GameSetup;