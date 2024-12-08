import { For, Show } from 'solid-js';

function PlayerPlaytimes(props) {
  const { playerData, includeGKPlaytime, getTotalPlayTime, formatTime } = props;

  const sortedPlayerData = () =>
    [...playerData()].sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a));

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Player Playtimes</h2>
      <ul>
        <For each={sortedPlayerData()}>
          {(player) => (
            <li class="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-md">
              <div class="font-medium text-lg">{player.name}</div>
              <div>{formatTime(getTotalPlayTime(player))}</div>
            </li>
          )}
        </For>
      </ul>
      <Show when={!includeGKPlaytime()}>
        <p class="mt-4 text-gray-700">Note: Playtime for goalkeepers is not included.</p>
      </Show>
    </div>
  );
}

export default PlayerPlaytimes;