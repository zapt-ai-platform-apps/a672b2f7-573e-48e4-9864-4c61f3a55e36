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
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Confirm New Goalkeeper</h2>
          <p>Are you sure you want to set {selectedNewGoalkeeper()} as the new goalkeeper?</p>
          <div class="mt-4 space-x-4">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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