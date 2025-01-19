import { Show } from 'solid-js';

function EndGameConfirmationModal(props) {
  const { showEndGameConfirm, confirmEndGame, cancelEndGame } = props;

  return (
    <Show when={showEndGameConfirm()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
          <h2 class="text-2xl font-bold mb-4 text-brand-500">Confirm End Game</h2>
          <p class="mb-4 text-lg">Are you sure you want to end the game?</p>
          <div class="flex justify-end space-x-4">
            <button
              class="px-6 py-3 bg-red-500 text-white text-lg rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={confirmEndGame}
            >
              Yes
            </button>
            <button
              class="px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={cancelEndGame}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default EndGameConfirmationModal;