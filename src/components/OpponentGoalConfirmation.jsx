function OpponentGoalConfirmation(props) {
  const { handleConfirm, handleCancel } = props;

  return (
    <div class="text-gray-800 dark:text-white">
      <p class="mt-4 mb-2 text-lg">Confirm opponent team scored?</p>
      <div class="mt-4 flex justify-end space-x-4">
        <button
          class="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          class="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default OpponentGoalConfirmation;