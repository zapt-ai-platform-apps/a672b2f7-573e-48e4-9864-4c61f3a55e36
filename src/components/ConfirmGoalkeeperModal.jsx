import { Show } from 'solid-js';

function ConfirmGoalkeeperModal(props) {
  const {
    showGKConfirmModal,
    selectedNewGoalkeeper,
    confirmGoalkeeper,
    setShowGKConfirmModal,
  } = props;

  return (
    <Show when={showGKConfirmModal()}>
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-4">Confirm Goalkeeper Change</h2>
          <p>
            Are you sure you want to make {selectedNewGoalkeeper()} the new goalkeeper?
          </p>
          <div class="mt-4">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={() => confirmGoalkeeper(selectedNewGoalkeeper())}
            >
              Yes
            </button>
            <button
              class="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={() => setShowGKConfirmModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default ConfirmGoalkeeperModal;