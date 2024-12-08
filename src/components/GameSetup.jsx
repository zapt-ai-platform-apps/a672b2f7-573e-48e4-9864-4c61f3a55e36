import { For, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import PlayerManager from './PlayerManager';
import GoalkeeperSettings from './GoalkeeperSettings';
import ErrorMessage from './ErrorMessage';
import useGameSetup from '../hooks/useGameSetup';

function GameSetup(props) {
  const { onStartGame } = props;
  const navigate = useNavigate();

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

  const handleStartGame = () => {
    if (players().length === 0) {
      setErrorMessage('You need at least one player to start the game.');
      return;
    }
    if (startingPlayersCount() === 0) {
      setErrorMessage('Please select at least one starting player.');
      return;
    }
    if (!goalkeeper()) {
      setErrorMessage('Please select a goalkeeper.');
      return;
    }
    setErrorMessage('');
    localStorage.setItem('players', JSON.stringify(players()));
    onStartGame(players(), goalkeeper(), includeGKPlaytime());
    navigate('/manage');
  };

  return (
    <div class="min-h-screen flex flex-col text-gray-800">
      <div class="p-8 flex-grow">
        <h1 class="text-4xl font-bold mb-8 text-green-600">Game Setup</h1>
        <p class="mb-8 text-gray-700 text-lg">
          Manage your team's substitutions and track playtime effortlessly. Add your players, select your starting lineup, choose your goalkeeper, and start the game to ensure fair playtime for all players.
        </p>
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
        <button
          class="px-8 py-4 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default GameSetup;