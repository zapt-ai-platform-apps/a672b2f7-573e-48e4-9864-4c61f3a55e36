import { Show } from 'solid-js';

function ConfirmGoalkeeperModal(props) {
  const {
    showGKConfirmModal,
    selectedNewGoalkeeper,
    confirmGoalkeeper,
    setShowGKConfirmModal,
  } = props;

  const handleConfirm = () => {
    confirmGoalkeeper(selectedNewGoalkeeper());
  };

  return (
    <Show when={showGKConfirmModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl mb-4 text-gray-800 dark:text-white">Confirm Goalkeeper Change</h2>
          <p class="text-lg text-gray-700 dark:text-gray-200 mb-4">
            Are you sure you want to make{' '}
            <strong class="font-semibold">{selectedNewGoalkeeper()}</strong> the new goalkeeper?
          </p>
          <div class="mt-4 flex justify-end space-x-4">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
              onClick={() => setShowGKConfirmModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default ConfirmGoalkeeperModal;