import { For } from 'solid-js';

function GoalkeeperSettings(props) {
  const { startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime } = props;

  return (
    <div class="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md mb-8">
      <label class="block font-semibold mb-4 text-gray-700 dark:text-gray-300 text-lg">Select Goalkeeper:</label>
      <select
        class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer box-border text-lg dark:bg-gray-700 dark:text-white"
        value={goalkeeper()}
        onChange={(e) => setGoalkeeper(e.target.value)}
      >
        <option value="">-- Select Goalkeeper --</option>
        <For each={startingPlayers()}>
          {(player) => (
            <option value={player.name}>{player.name}</option>
          )}
        </For>
      </select>
      <div class="flex items-center mt-4">
        <input
          type="checkbox"
          checked={includeGKPlaytime()}
          onChange={() => setIncludeGKPlaytime(!includeGKPlaytime())}
          class="mr-2 cursor-pointer w-6 h-6"
        />
        <label class="text-gray-800 dark:text-gray-200 text-lg">{includeGKPlaytime() ? 'Include' : 'Exclude'} Goalkeeper's Playtime in Totals</label>
      </div>
    </div>
  );
}

export default GoalkeeperSettings;