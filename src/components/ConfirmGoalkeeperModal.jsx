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
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl mb-4">Confirm Goalkeeper Change</h2>
          <p>
            Are you sure you want to make{' '}
            <strong>{selectedNewGoalkeeper()}</strong> the new goalkeeper?
          </p>
          <div class="mt-4">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
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