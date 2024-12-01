import { Show } from 'solid-js';

function AddPlayerModal(props) {
  const {
    showAddPlayerModal,
    setShowAddPlayerModal,
    newPlayerName,
    setNewPlayerName,
    addNewPlayer,
  } = props;

  const addPlayerAndCloseModal = () => {
    if (newPlayerName().trim() !== '') {
      addNewPlayer();
      setNewPlayerName(''); // Reset the input
      setShowAddPlayerModal(false); // Close the modal
    }
  };

  const cancelAddPlayer = () => {
    setNewPlayerName(''); // Reset the input
    setShowAddPlayerModal(false);
  };

  return (
    <Show when={showAddPlayerModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4 text-green-600">
            Add New Player
          </h2>
          <input
            type="text"
            placeholder="Player Name"
            value={newPlayerName()}
            onInput={(e) => setNewPlayerName(e.target.value)}
            class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent mb-4 box-border text-lg"
          />
          <div class="flex justify-end space-x-4">
            <button
              class="px-6 py-3 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={addPlayerAndCloseModal}
            >
              Add
            </button>
            <button
              class="px-6 py-3 bg-gray-500 text-white text-lg rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out"
              onClick={cancelAddPlayer}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default AddPlayerModal;