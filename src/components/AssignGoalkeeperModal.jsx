import { Show } from 'solid-js';

function AssignGoalkeeperModal(props) {
  const {
    showGKModal,
    availablePlayers,
    setSelectedNewGoalkeeper,
    setShowGKConfirmModal,
    setShowGKModal,
  } = props;

  const selectGoalkeeper = (playerName) => {
    setSelectedNewGoalkeeper(playerName);
    setShowGKModal(false);
    setShowGKConfirmModal(true);
  };

  return (
    <Show when={showGKModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-2xl mb-4 text-gray-800 dark:text-white">Select a New Goalkeeper</h2>
          <ul>
            {availablePlayers().map((player) => (
              <li key={player.name} class="mb-2">
                <button
                  class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={() => selectGoalkeeper(player.name)}
                >
                  {player.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            class="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
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