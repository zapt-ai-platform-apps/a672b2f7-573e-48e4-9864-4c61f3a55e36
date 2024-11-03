import { createSignal, createEffect } from 'solid-js';
import { For } from 'solid-js/web';

function GameSetup(props) {
  const [playerNames, setPlayerNames] = createSignal([]);
  const [currentPlayerName, setCurrentPlayerName] = createSignal('');
  const [numPlayersOnField, setNumPlayersOnField] = createSignal(5);
  const [matchDuration, setMatchDuration] = createSignal(60);
  const [startingLineup, setStartingLineup] = createSignal([]);

  const addPlayer = () => {
    if (currentPlayerName().trim() !== '') {
      setPlayerNames([...playerNames(), currentPlayerName().trim()]);
      setCurrentPlayerName('');
    }
  };

  const removePlayer = (name) => {
    setPlayerNames(playerNames().filter(player => player !== name));
    setStartingLineup(startingLineup().filter(player => player !== name));
  };

  const toggleStartingPlayer = (name) => {
    if (startingLineup().includes(name)) {
      setStartingLineup(startingLineup().filter(player => player !== name));
    } else {
      if (startingLineup().length < numPlayersOnField()) {
        setStartingLineup([...startingLineup(), name]);
      } else {
        alert(`You can only select ${numPlayersOnField()} starting players.`);
      }
    }
  };

  const startGame = () => {
    if (playerNames().length < numPlayersOnField()) {
      alert('Not enough players to start the game.');
      return;
    }
    if (startingLineup().length !== numPlayersOnField()) {
      alert(`Please select exactly ${numPlayersOnField()} starting players.`);
      return;
    }
    props.onStartGame(playerNames(), numPlayersOnField(), matchDuration(), startingLineup());
  };

  createEffect(() => {
    // Ensure starting lineup doesn't exceed numPlayersOnField
    if (startingLineup().length > numPlayersOnField()) {
      setStartingLineup(startingLineup().slice(0, numPlayersOnField()));
    }
  });

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
          <label class="block text-gray-700 mb-2">Players (Select Starting Line-up)</label>
          <ul>
            <For each={playerNames()}>
              {(name) => (
                <li class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      checked={startingLineup().includes(name)}
                      onChange={() => toggleStartingPlayer(name)}
                      class="cursor-pointer mr-2"
                    />
                    <span>{name}</span>
                  </div>
                  <button
                    class="text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => removePlayer(name)}
                  >
                    Remove
                  </button>
                </li>
              )}
            </For>
          </ul>
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