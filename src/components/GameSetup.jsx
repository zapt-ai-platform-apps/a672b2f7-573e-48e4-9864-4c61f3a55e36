import { createSignal } from 'solid-js';

function GameSetup(props) {
  const [playerNames, setPlayerNames] = createSignal([]);
  const [currentPlayerName, setCurrentPlayerName] = createSignal('');
  const [numPlayersOnField, setNumPlayersOnField] = createSignal(5);
  const [matchDuration, setMatchDuration] = createSignal(60);

  const addPlayer = () => {
    if (currentPlayerName().trim() !== '') {
      setPlayerNames([...playerNames(), currentPlayerName().trim()]);
      setCurrentPlayerName('');
    }
  };

  const removePlayer = (name) => {
    setPlayerNames(playerNames().filter(player => player !== name));
  };

  const startGame = () => {
    if (playerNames().length >= numPlayersOnField()) {
      props.onStartGame(playerNames(), numPlayersOnField(), matchDuration());
    } else {
      alert('Not enough players to start the game.');
    }
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
              class="p-2 bg-green-500 text-white rounded-r-lg cursor-pointer hover:bg-green-600 transition"
              onClick={addPlayer}
            >
              Add
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Players</label>
          <ul>
            {playerNames().map(name => (
              <li class="flex justify-between items-center mb-2">
                <span>{name}</span>
                <button
                  class="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => removePlayer(name)}
                >
                  Remove
                </button>
              </li>
            ))}
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
          class="w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default GameSetup;