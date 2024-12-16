import { Show } from 'solid-js';
import Footer from './Footer';
import PlayerManager from './PlayerManager';
import GoalkeeperSettings from './GoalkeeperSettings';
import ErrorMessage from './ErrorMessage';
import useGameSetup from '../hooks/useGameSetup';
import GameIntro from './GameIntro';
import StartGameButton from './StartGameButton';

function GameSetup(props) {
  const { onStartGame } = props;

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
    toggleStartingPlayer,
  } = useGameSetup();

  return (
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div class="p-8 flex-grow">
        <GameIntro />
        <PlayerManager
          playerName={playerName}
          setPlayerName={setPlayerName}
          players={players}
          setPlayers={setPlayers}
          startingPlayersCount={startingPlayersCount}
          setStartingPlayersCount={setStartingPlayersCount}
          startingPlayers={startingPlayers}
          setStartingPlayers={setStartingPlayers}
          addPlayer={addPlayer}
          deletePlayer={deletePlayer}
          toggleStartingPlayer={toggleStartingPlayer}
        />
        <Show when={startingPlayersCount() > 0}>
          <GoalkeeperSettings
            startingPlayers={startingPlayers}
            goalkeeper={goalkeeper}
            setGoalkeeper={setGoalkeeper}
            includeGKPlaytime={includeGKPlaytime}
            setIncludeGKPlaytime={setIncludeGKPlaytime}
          />
        </Show>
        <ErrorMessage errorMessage={errorMessage} />
        <StartGameButton
          players={players}
          startingPlayersCount={startingPlayersCount}
          goalkeeper={goalkeeper}
          includeGKPlaytime={includeGKPlaytime}
          setErrorMessage={setErrorMessage}
          onStartGame={onStartGame}
        />
      </div>
      <Footer />
    </div>
  );
}

export default GameSetup;