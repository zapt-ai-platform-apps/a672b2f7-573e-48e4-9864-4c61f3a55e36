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
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-green-600">
            Confirm Change Goalkeeper
          </h2>
          <p class="mb-4 text-lg">
            Are you sure you want to change the goalkeeper to{' '}
            {selectedNewGoalkeeper()}?
          </p>
          <div class="flex justify-end space-x-4">
            <button
              class="px-6 py-3 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={() => {
                confirmGoalkeeper(selectedNewGoalkeeper());
              }}
            >
              Yes
            </button>
            <button
              class="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
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