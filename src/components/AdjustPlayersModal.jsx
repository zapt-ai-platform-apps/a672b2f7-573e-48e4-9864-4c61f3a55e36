import { Show, For } from 'solid-js';

function AdjustPlayersModal(props) {
  const {
    showAdjustModal,
    setShowAdjustModal,
    adjustType,
    onFieldPlayers,
    offFieldPlayers,
    setSelectedPlayer,
    setShowConfirmModal,
  } = props;

  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player);
    setShowAdjustModal(false);
    setShowConfirmModal(true);
  };

  const playersList = () => {
    return adjustType() === 'increase' ? offFieldPlayers() : onFieldPlayers();
  };

  return (
    <Show when={showAdjustModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {adjustType() === 'increase' ? 'Add Player to Field' : 'Remove Player from Field'}
          </h2>
          <ul>
            <For each={playersList()}>
              {(player) => (
                <li
                  class="p-4 mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                  onClick={() => handlePlayerSelection(player)}
                >
                  {player.name}
                </li>
              )}
            </For>
          </ul>
          <button
            class="mt-4 px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
            onClick={() => setShowAdjustModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Show>
  );
}

export default AdjustPlayersModal;