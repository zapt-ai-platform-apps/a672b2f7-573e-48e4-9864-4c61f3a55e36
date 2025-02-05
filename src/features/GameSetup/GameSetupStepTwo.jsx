import React from 'react';
import PlayerManager from './PlayerManager.jsx';
import GoalkeeperSettings from '../../components/GoalkeeperSettings.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import StartGameButton from './StartGameButton.jsx';

function GameSetupStepTwo({
  playerName,
  setPlayerName,
  selectedMatchPlayers,
  addPlayer,
  deletePlayer,
  toggleStartingPlayer,
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  errorMessage,
  handleBack,
  handleStartGame,
  setErrorMessage
}) {
  return (
    <>
      <PlayerManager
        playerName={playerName}
        setPlayerName={setPlayerName}
        players={selectedMatchPlayers}
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
      <div className="flex justify-between mt-4">
        <button
          className="px-8 py-4 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleBack}
        >
          Back
        </button>
        <StartGameButton
          players={selectedMatchPlayers}
          startingPlayersCount={startingPlayers.length}
          goalkeeper={goalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setErrorMessage={setErrorMessage}
          onStartGame={() =>
            handleStartGame(selectedMatchPlayers, goalkeeper, includeGKPlaytime)
          }
        />
      </div>
    </>
  );
}

export default GameSetupStepTwo;