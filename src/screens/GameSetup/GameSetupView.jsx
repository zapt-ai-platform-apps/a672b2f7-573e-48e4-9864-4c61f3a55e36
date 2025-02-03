import React from 'react';
import GameIntro from './GameIntro';
import PlayerManager from './PlayerManager';
import StartGameButton from './StartGameButton';
import GoalkeeperSettings from '../../components/GoalkeeperSettings';
import ErrorMessage from '../../components/ErrorMessage';
import MatchSquadSelector from '../../components/MatchSquadSelector';

function GameSetupView({
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
  setIncludeGKPlaytime,
  handleStartGame,
  matchSquadPlayers,
  toggleMatchPlayer
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        <GameIntro />
        <MatchSquadSelector
          allPlayers={matchSquadPlayers}
          selectedPlayers={matchSquadPlayers.filter(player => player.isInMatch)}
          togglePlayer={toggleMatchPlayer}
        />
        <PlayerManager
          playerName={playerName}
          setPlayerName={setPlayerName}
          players={matchSquadPlayers.filter(player => player.isInMatch)}
          addPlayer={addPlayer}
          deletePlayer={deletePlayer}
          toggleStartingPlayer={toggleStartingPlayer}
          startingPlayersCount={startingPlayers.length}
        />
        {startingPlayers.length > 0 && (
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
          players={matchSquadPlayers.filter(player => player.isInMatch)}
          startingPlayersCount={startingPlayers.length}
          goalkeeper={goalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setErrorMessage={setErrorMessage}
          onStartGame={() =>
            handleStartGame(
              matchSquadPlayers.filter(player => player.isInMatch),
              goalkeeper,
              includeGKPlaytime
            )
          }
        />
      </div>
    </div>
  );
}

export default GameSetupView;