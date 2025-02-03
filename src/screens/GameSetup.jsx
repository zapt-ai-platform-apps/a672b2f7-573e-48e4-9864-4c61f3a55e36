import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameIntro from './GameSetup/GameIntro';
import PlayerManager from './GameSetup/PlayerManager';
import StartGameButton from './GameSetup/StartGameButton';
import GoalkeeperSettings from '../components/GoalkeeperSettings';
import ErrorMessage from '../components/ErrorMessage';
import useGameSetup from '../hooks/useGameSetup';
import { useStateContext } from '../state';
import MatchSquadSelector from '../components/MatchSquadSelector';
import useMatchSquad from '../hooks/useMatchSquad';

function GameSetup() {
  const { handleStartGame } = useStateContext();
  const { 
    playerName,
    setPlayerName,
    errorMessage,
    setErrorMessage,
    startingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer 
  } = useGameSetup();

  const { activeMatchPlayers, toggleMatchPlayer } = useMatchSquad();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        <GameIntro />
        
        <MatchSquadSelector
          allPlayers={activeMatchPlayers}
          selectedPlayers={activeMatchPlayers}
          togglePlayer={toggleMatchPlayer}
        />

        <PlayerManager
          playerName={playerName}
          setPlayerName={setPlayerName}
          players={activeMatchPlayers}
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
          players={activeMatchPlayers}
          startingPlayersCount={startingPlayers.length}
          goalkeeper={goalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setErrorMessage={setErrorMessage}
          onStartGame={() => handleStartGame(activeMatchPlayers, goalkeeper, includeGKPlaytime)}
        />
      </div>
    </div>
  );
}

export default GameSetup;