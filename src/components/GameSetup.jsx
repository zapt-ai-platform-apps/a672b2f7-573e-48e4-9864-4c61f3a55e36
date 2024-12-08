import { createSignal, For, Show, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import PlayerManager from './PlayerManager';
import GoalkeeperSettings from './GoalkeeperSettings';

function GameSetup(props) {
  const { onStartGame } = props;
  const [playerName, setPlayerName] = createSignal('');
  const [players, setPlayers] = createSignal([]);
  const [startingPlayersCount, setStartingPlayersCount] = createSignal(0);
  const [errorMessage, setErrorMessage] = createSignal('');
  const [startingPlayers, setStartingPlayers] = createSignal([]);
  const [goalkeeper, setGoalkeeper] = createSignal('');
  const [includeGKPlaytime, setIncludeGKPlaytime] = createSignal(true);
  const navigate = useNavigate();

  onMount(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      const loadedPlayers = JSON.parse(savedPlayers);
      const updatedPlayers = loadedPlayers.map((player) => ({
        ...player,
        isStartingPlayer: false,
      }));
      setPlayers(updatedPlayers);
    }
  });

  const addPlayer = () => {
    if (playerName().trim() !== '') {
      const newPlayer = {
        name: playerName().trim(),
        isStartingPlayer: false,
      };
      setPlayers([...players(), newPlayer]);
      setPlayerName('');
    }
  };

  const deletePlayer = (playerName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${playerName}?`);
    if (confirmDelete) {
      const updatedPlayers = players().filter((player) => player.name !== playerName);
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
    }
  };

  const toggleStartingPlayer = (playerName) => {
    setPlayers(
      players().map((player) => {
        if (player.name === playerName) {
          player.isStartingPlayer = !player.isStartingPlayer;
        }
        return player;
      })
    );
    const count = players().filter((p) => p.isStartingPlayer).length;
    setStartingPlayersCount(count);
    setStartingPlayers(players().filter((p) => p.isStartingPlayer));
  };

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
        <Show when={errorMessage()}>
          <div class="bg-red-100 text-red-700 p-4 rounded mb-8 text-lg">
            {errorMessage()}
          </div>
        </Show>
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