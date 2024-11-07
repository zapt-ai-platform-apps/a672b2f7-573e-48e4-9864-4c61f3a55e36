import { createSignal, For, Show, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function GameSetup(props) {
  const { onStartGame } = props;
  const [playerName, setPlayerName] = createSignal('');
  const [players, setPlayers] = createSignal([]);
  const [numOnField, setNumOnField] = createSignal(5);
  const [startingPlayersCount, setStartingPlayersCount] = createSignal(0);
  const [errorMessage, setErrorMessage] = createSignal('');
  const [startingPlayers, setStartingPlayers] = createSignal([]);
  const [goalkeeper, setGoalkeeper] = createSignal('');
  const navigate = useNavigate();

  onMount(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
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

  const toggleStartingPlayer = (playerName) => {
    setPlayers(
      players().map((player) => {
        if (player.name === playerName) {
          player.isStartingPlayer = !player.isStartingPlayer;
        }
        return player;
      })
    );
    // Update starting players count
    const count = players().filter((p) => p.isStartingPlayer).length;
    setStartingPlayersCount(count);
    setStartingPlayers(players().filter((p) => p.isStartingPlayer));
  };

  const handleStartGame = () => {
    if (players().length < numOnField()) {
      setErrorMessage(
        `You need at least ${numOnField()} players to start the game.`
      );
      return;
    }
    if (startingPlayersCount() !== numOnField()) {
      setErrorMessage(
        `Please select exactly ${numOnField()} starting players.`
      );
      return;
    }
    if (!goalkeeper()) {
      setErrorMessage(`Please select a goalkeeper.`);
      return;
    }
    setErrorMessage('');
    localStorage.setItem('players', JSON.stringify(players()));
    onStartGame(players(), numOnField(), goalkeeper());
    navigate('/manage');
  };

  return (
    <div class="min-h-screen p-4 flex flex-col text-gray-800">
      <h1 class="text-3xl font-bold mb-4 text-green-600">Game Setup</h1>
      <div class="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 class="text-2xl font-bold mb-2 text-green-600">Add Players</h2>
        <div class="flex">
          <input
            type="text"
            class="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border"
            placeholder="Player Name"
            value={playerName()}
            onInput={(e) => setPlayerName(e.target.value)}
          />
          <button
            class="p-2 bg-green-500 text-white rounded-r-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={addPlayer}
          >
            Add
          </button>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md mb-4">
        <label class="block font-semibold mb-2">
          Number of Players on Field:
        </label>
        <input
          type="number"
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border"
          min="1"
          value={numOnField()}
          onInput={(e) => setNumOnField(parseInt(e.target.value))}
        />
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 class="text-2xl font-bold mb-2 text-green-600">
          Select Starting Line-up
        </h2>
        <p class="mb-2">
          Select exactly {numOnField()} players to start on the field.
        </p>
        <ul>
          <For each={players()}>
            {(player) => (
              <li class="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={player.isStartingPlayer}
                  onChange={() => toggleStartingPlayer(player.name)}
                  class="mr-2 cursor-pointer"
                />
                <span>{player.name}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
      <Show when={startingPlayersCount() === numOnField()}>
        <div class="bg-white p-4 rounded-lg shadow-md mb-4">
          <label class="block font-semibold mb-2">Select Goalkeeper:</label>
          <select
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border"
            value={goalkeeper()}
            onChange={(e) => setGoalkeeper(e.target.value)}
          >
            <option value="">-- Select Goalkeeper --</option>
            <For each={startingPlayers()}>
              {(player) => <option value={player.name}>{player.name}</option>}
            </For>
          </select>
        </div>
      </Show>
      <Show when={errorMessage()}>
        <div class="bg-red-100 text-red-700 p-2 rounded mb-4">
          {errorMessage()}
        </div>
      </Show>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
}

export default GameSetup;