import { Show, For } from 'solid-js';

function ScorerSelection(props) {
  const { players, scorerName, setScorerName, handleConfirm, handleCancel } = props;

  return (
    <div class="flex-grow overflow-y-auto">
      <p class="mt-4 mb-2 text-lg">Who scored?</p>
      <ul>
        <For each={[...players().map((player) => player.name), 'Own Goal']}>
          {(name) => (
            <li
              class={`p-4 cursor-pointer hover:bg-gray-200 rounded-lg text-2xl ${
                scorerName() === name ? 'bg-blue-200' : ''
              }`}
              onClick={() => setScorerName(name)}
            >
              {name}
            </li>
          )}
        </For>
      </ul>
      <Show
        when={scorerName()}
        fallback={
          <button
            class="mt-4 w-full py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={handleCancel}
          >
            Cancel
          </button>
        }
      >
        <div class="mt-4 flex justify-end space-x-4">
          <button
            class="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            class="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Show>
    </div>
  );
}

export default ScorerSelection;