import { For } from 'solid-js/web';

function PlayerList({ players, toggleStartingPlayer, removePlayer }) {
  return (
    <ul>
      <For each={players()}>
        {(player) => (
          <li class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <input
                type="checkbox"
                checked={player.isStartingPlayer}
                onInput={() => toggleStartingPlayer(player.name)}
                class="cursor-pointer mr-2"
              />
              <span>{player.name}</span>
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
  );
}

export default PlayerList;