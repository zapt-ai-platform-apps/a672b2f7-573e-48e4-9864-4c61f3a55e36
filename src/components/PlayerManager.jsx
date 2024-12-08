import { For } from 'solid-js';

function PlayerManager(props) {
  const {
    playerName,
    setPlayerName,
    players,
    addPlayer,
    deletePlayer,
    toggleStartingPlayer,
    startingPlayersCount,
  } = props;

  return (
    <>
      <div class="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 class="text-2xl font-bold mb-4 text-green-600">Add Players</h2>
        <div class="flex flex-col sm:flex-row">
          <input
            type="text"
            class="sm:flex-1 p-4 border border-gray-300 sm:rounded-l-lg rounded-t-lg sm:rounded-tr-none sm:rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border text-lg"
            placeholder="Player Name"
            value={playerName()}
            onInput={(e) => setPlayerName(e.target.value)}
          />
          <button
            class="sm:px-8 px-4 py-4 bg-green-500 text-white text-lg sm:rounded-r-lg rounded-b-lg sm:rounded-bl-none cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out sm:mt-0 mt-2"
            onClick={addPlayer}
          >
            Add
          </button>
        </div>
      </div>
      <div class="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 class="text-2xl font-bold mb-4 text-green-600">
          Select Starting Line-up
        </h2>
        <p class="mb-4 text-gray-700 text-lg">
          Select players to start on the field.
        </p>
        <p class="mb-4 text-gray-700 text-lg">
          You have selected {startingPlayersCount()} {startingPlayersCount() === 1 ? 'player' : 'players'} for the starting lineup.
        </p>
        <ul>
          <For each={players()}>
            {(player) => (
              <li class="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={player.isStartingPlayer}
                  onChange={() => toggleStartingPlayer(player.name)}
                  class="mr-4 cursor-pointer w-6 h-6"
                />
                <span class="flex-1 text-gray-800 text-lg">{player.name}</span>
                <button
                  class="ml-4 text-red-500 hover:text-red-700 cursor-pointer text-2xl"
                  onClick={() => deletePlayer(player.name)}
                >
                  &#128465;
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </>
  );
}

export default PlayerManager;