import { For } from 'solid-js';

function GoalkeeperSettings(props) {
  const {
    startingPlayers,
    goalkeeper,
    setGoalkeeper,
    includeGKPlaytime,
    setIncludeGKPlaytime,
  } = props;

  return (
    <>
      <div class="bg-white p-8 rounded-lg shadow-md mb-8">
        <label class="block font-semibold mb-4 text-gray-700 text-lg">
          Select Goalkeeper:
        </label>
        <select
          class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border text-lg"
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
      </div>
      <div class="bg-white p-8 rounded-lg shadow-md mb-8">
        <label class="block font-semibold mb-4 text-gray-700 text-lg">
          Include Goalkeeper's Playtime in Totals:
        </label>
        <input
          type="checkbox"
          checked={includeGKPlaytime()}
          onChange={() => setIncludeGKPlaytime(!includeGKPlaytime())}
          class="mr-2 cursor-pointer w-6 h-6"
        />
        <span class="text-gray-800 text-lg">
          {includeGKPlaytime() ? 'Yes' : 'No'}
        </span>
      </div>
    </>
  );
}

export default GoalkeeperSettings;