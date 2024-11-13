import { Show } from 'solid-js';

function Substitution(props) {
  const {
    selectedSubOffPlayer,
    selectedSubOnPlayer,
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
            <Show when={selectedSubOffPlayer()} fallback="Select a player from the Players on Field list">
              {selectedSubOffPlayer().name}
            </Show>
          </div>
        </div>
        <div class="md:w-1/2 md:pl-4">
          <label class="block font-semibold mb-2 text-gray-700 text-lg">
            Player to Sub On:
          </label>
          <div class="p-4 border border-gray-300 rounded-lg box-border h-16 flex items-center text-lg">
            <Show when={selectedSubOnPlayer()} fallback="Select a player from the Players Off Field list">
              {selectedSubOnPlayer().name}
            </Show>
          </div>
        </div>
      </div>
      <button
        class={`mt-4 px-8 py-4 bg-blue-500 text-white text-lg rounded-lg ${
          !selectedSubOffPlayer() || !selectedSubOnPlayer()
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-blue-600 hover:scale-105'
        } transition duration-300 ease-in-out`}
        onClick={makeSubstitution}
        disabled={!selectedSubOffPlayer() || !selectedSubOnPlayer()}
      >
        Make Substitution
      </button>
    </div>
  );
}

export default Substitution;