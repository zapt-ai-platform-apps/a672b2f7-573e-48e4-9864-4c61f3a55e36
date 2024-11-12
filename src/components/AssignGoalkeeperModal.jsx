import { Show, For } from 'solid-js';

function AssignGoalkeeperModal(props) {
  const {
    showGKModal,
    onFieldPlayers,
    setSelectedNewGoalkeeper,
    setShowGKConfirmModal,
    setShowGKModal,
  } = props;

  return (
    <Show when={showGKModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-green-600">
            Assign Goalkeeper
          </h2>
          <ul>
            <For each={onFieldPlayers()}>
              {(player) => (
                <li
                  class="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
                  onClick={() => {
                    setSelectedNewGoalkeeper(player.name);
                    setShowGKConfirmModal(true);
                  }}
                >
                  <div>{player.name}</div>
                  <div>
                    {player.isGoalkeeper && (
                      <span class="text-yellow-500 font-semibold">(GK)</span>
                    )}
                  </div>
                </li>
              )}
            </For>
          </ul>
          <button
            class="mt-4 w-full py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => setShowGKModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Show>
  );
}

export default AssignGoalkeeperModal;