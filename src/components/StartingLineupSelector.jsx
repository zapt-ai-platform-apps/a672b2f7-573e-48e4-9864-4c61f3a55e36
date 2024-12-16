import { For } from 'solid-js';

function StartingLineupSelector(props) {
  const {
    players,
    startingPlayersCount,
    toggleStartingPlayer,
    handleDeletePlayer,
  } = props;

  return (
    <div class="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600">
        Select Starting Line-up
      </h2>
      <p class="mb-4 text-gray-700 text-lg">
        Select players to start on the field.
      </p>
      <p class="mb-4 text-gray-700 text-lg">
        You have selected {startingPlayersCount()}{' '}
        {startingPlayersCount() === 1 ? 'player' : 'players'} for the starting
        lineup.
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
                onClick={() => handleDeletePlayer(player.name)}
              >
                &#128465;
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export default StartingLineupSelector;