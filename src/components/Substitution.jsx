import { For } from 'solid-js';

function Substitution(props) {
  const {
    selectedSubOffPlayer,
    offFieldPlayers,
    selectedOnPlayer,
    setSelectedOnPlayer,
    makeSubstitution,
  } = props;

  return (
    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 class="text-2xl font-bold mb-2 text-green-600">Substitution</h2>
      <div class="flex flex-col md:flex-row items-start md:items-center">
        <div class="md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <label class="block font-semibold mb-2 text-gray-700 text-lg">
            Player to Sub Off:
          </label>
          <div class="p-4 border border-gray-300 rounded-lg box-border h-16 flex items-center text-lg">
            {selectedSubOffPlayer()
              ? selectedSubOffPlayer().name
              : 'Select a player'}
          </div>
        </div>
        <div class="md:w-1/2 md:pl-4">
          <label class="block font-semibold mb-2 text-gray-700 text-lg">
            Select Player to Sub On:
          </label>
          <select
            class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border h-16 text-lg"
            value={selectedOnPlayer()}
            onChange={(e) => setSelectedOnPlayer(e.target.value)}
          >
            <For each={offFieldPlayers()}>
              {(player) => (
                <option value={player.name}>{player.name}</option>
              )}
            </For>
          </select>
        </div>
      </div>
      <button
        class="mt-4 px-8 py-4 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out"
        onClick={makeSubstitution}
      >
        Make Substitution
      </button>
    </div>
  );
}

export default Substitution;