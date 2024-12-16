import { Show } from 'solid-js';

function ConfirmAdjustPlayersModal(props) {
  const {
    showConfirmModal,
    setShowConfirmModal,
    selectedPlayer,
    adjustType,
    confirmAdjustment,
  } = props;

  const actionText = () => {
    return adjustType() === 'increase' ? 'add' : 'remove';
  };

  return (
    <Show when={showConfirmModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h2 class="text-2xl font-bold mb-4 text-green-600">Confirm Action</h2>
          <p class="mb-4 text-lg">
            Are you sure you want to {actionText()} <strong>{selectedPlayer().name}</strong> {adjustType() === 'increase' ? 'to' : 'from'} the field?
          </p>
          <div class="flex justify-end space-x-4">
            <button
              class="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={confirmAdjustment}
            >
              Yes
            </button>
            <button
              class="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
              onClick={() => setShowConfirmModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default ConfirmAdjustPlayersModal;