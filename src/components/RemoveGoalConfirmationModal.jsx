import { Show } from 'solid-js';

function RemoveGoalConfirmationModal(props) {
  const { showRemoveGoalConfirm, confirmRemoveGoal, cancelRemoveGoal } = props;

  return (
    <Show when={showRemoveGoalConfirm()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-green-600">Confirm Remove Last Goal</h2>
          <p class="mb-4 text-lg">Are you sure you want to remove the last goal scored?</p>
          <div class="flex justify-end space-x-4">
            <button
              class="px-6 py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={confirmRemoveGoal}
            >
              Yes
            </button>
            <button
              class="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
              onClick={cancelRemoveGoal}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default RemoveGoalConfirmationModal;