import { For, Show } from 'solid-js';

function PlayerPlaytimes(props) {
  const { playerData, includeGKPlaytime, getTotalPlayTime, formatTime } = props;

  const sortedPlayerData = () =>
    [...playerData()].sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a));

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Player Playtimes</h2>
      <ul>
        <For each={sortedPlayerData()}>
          {(player) => (
            <li class="flex justify-between items-center mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div class="font-medium text-lg text-gray-800 dark:text-white">{player.name}</div>
              <div class="text-gray-800 dark:text-white">{formatTime(getTotalPlayTime(player))}</div>
            </li>
          )}
        </For>
      </ul>
      <Show when={!includeGKPlaytime()}>
        <p class="mt-4 text-gray-700 dark:text-gray-300">Note: Playtime for goalkeepers is not included.</p>
      </Show>
    </div>
  );
}

export default PlayerPlaytimes;