import { createSignal, createEffect, onMount } from 'solid-js';
import { For } from 'solid-js/web';

function GameSetup(props) {
  const [players, setPlayers] = createSignal([]);
  const [currentPlayerName, setCurrentPlayerName] = createSignal('');
  const [numPlayersOnField, setNumPlayersOnField] = createSignal(5);
  const [matchDuration, setMatchDuration] = createSignal(60);

  // Load players from localStorage on mount
  onMount(() => {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  });

  // Save players to localStorage whenever they change
  createEffect(() => {
    localStorage.setItem('players', JSON.stringify(players()));
  });

  const addPlayer = () => {
    if (currentPlayerName().trim() !== '') {
      setPlayers([
        ...players(),
        {
          name: currentPlayerName().trim(),
          isStarPlayer: false,
          isStartingPlayer: false,
        },
      ]);
      setCurrentPlayerName('');
    }
  };

  const removePlayer = (name) => {
    setPlayers(players().filter((player) => player.name !== name));
  };

  const toggleStartingPlayer = (name) => {
    const selectedCount = players().filter((player) => player.isStartingPlayer).length;
    const player = players().find((player) => player.name === name);
    if (!player.isStartingPlayer && selectedCount >= numPlayersOnField()) {
      alert(`You can only select ${numPlayersOnField()} starting players.`);
      return;
    }
    setPlayers(
      players().map((player) =>
        player.name === name
          ? { ...player, isStartingPlayer: !player.isStartingPlayer }
          : player
      )
    );
  };

  const toggleStarPlayer = (name) => {
    setPlayers(
      players().map((player) =>
        player.name === name ? { ...player, isStarPlayer: !player.isStarPlayer } : player
      )
    );
  };

  const startGame = () => {
    const totalPlayers = players().length;
    const startingPlayers = players().filter((player) => player.isStartingPlayer);
    if (totalPlayers < numPlayersOnField()) {
      alert('Not enough players to start the game.');
      return;
    }
    if (startingPlayers.length !== numPlayersOnField()) {
      alert(`Please select exactly ${numPlayersOnField()} starting players.`);
      return;
    }
    props.onStartGame(players(), numPlayersOnField(), matchDuration());
  };

  return (
    <div class="h-full flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold mb-4 text-green-600">Football Subs</h1>
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4 text-green-600">Game Setup</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Add Player</label>
          <div class="flex">
            <input
              type="text"
              class="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border"
              value={currentPlayerName()}
              onInput={(e) => setCurrentPlayerName(e.target.value)}
            />
            <button
              class="p-2 bg-green-500 text-white rounded-r-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={addPlayer}
            >
              Add
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Players (Select Starting Line-up and Star Players)</label>
          <ul>
            <For each={players()}>
              {(player) => (
                <li class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      checked={player.isStartingPlayer}
                      onChange={() => toggleStartingPlayer(player.name)}
                      class="cursor-pointer mr-2"
                    />
                    <span>{player.name}</span>
                    <button
                      class={`ml-2 cursor-pointer ${
                        player.isStarPlayer ? 'text-yellow-500' : 'text-gray-500'
                      }`}
                      onClick={() => toggleStarPlayer(player.name)}
                      title="Toggle Star Player"
                    >
                      {player.isStarPlayer ? '★' : '☆'}
                    </button>
                  </div>
                  <button
                    class="text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => removePlayer(player.name)}
                  >
                    Remove
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div class="mt-4">
          <h3 class="text-lg font-semibold text-green-600">What is a Star Player?</h3>
          <p class="text-gray-700">
            Star players are key players who are prioritized in substitutions.
            The app ensures that no more than two star players are off the field at the same time during the game.
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Number of Players on Field</label>
          <input
            type="number"
            min="1"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border"
            value={numPlayersOnField()}
            onInput={(e) => setNumPlayersOnField(parseInt(e.target.value))}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Match Length (minutes)</label>
          <input
            type="number"
            min="1"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border"
            value={matchDuration()}
            onInput={(e) => setMatchDuration(parseInt(e.target.value))}
          />
        </div>
        <button
          class="w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default GameSetup;