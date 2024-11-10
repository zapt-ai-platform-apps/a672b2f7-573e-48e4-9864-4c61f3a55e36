import { Show } from 'solid-js';

function EndGameConfirmationModal(props) {
  const { showEndGameConfirm, confirmEndGame, cancelEndGame } = props;

  return (
    <Show when={showEndGameConfirm()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-green-600">
            Confirm End Game
          </h2>
          <p class="mb-4">Are you sure you want to end the game?</p>
          <div class="flex justify-end space-x-4">
            <button
              class="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer"
              onClick={confirmEndGame}
            >
              Yes
            </button>
            <button
              class="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out cursor-pointer"
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