import { Show, For } from 'solid-js';

function AssignGoalkeeperModal(props) {
  const {
    showGKModal,
    onFieldPlayers,
    setSelectedNewGoalkeeper,
    setShowGKConfirmModal,
    setShowGKModal,
  } = props;

  const selectGoalkeeper = (playerName) => {
    setSelectedNewGoalkeeper(playerName);
    setShowGKConfirmModal(true);
  };

  return (
    <Show when={showGKModal()}>
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Select New Goalkeeper</h2>
          <ul>
            <For each={onFieldPlayers()}>
              {(player) => (
                <li>
                  <button
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg mb-2 cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={() => selectGoalkeeper(player.name)}
                  >
                    {player.name}
                  </button>
                </li>
              )}
            </For>
          </ul>
          <button
            class="px-4 py-2 bg-gray-500 text-white rounded-lg mt-4 cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
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