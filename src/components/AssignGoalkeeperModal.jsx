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
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl mb-4">Select a new goalkeeper</h2>
          <ul>
            {availablePlayers().map((player) => (
              <li key={player.name} class="mb-2">
                <button
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => selectGoalkeeper(player.name)}
                >
                  {player.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            class="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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