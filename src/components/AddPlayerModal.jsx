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
      setNewPlayerName('');
      setShowAddPlayerModal(false);
    }
  };

  const cancelAddPlayer = () => {
    setNewPlayerName('');
    setShowAddPlayerModal(false);
  };

  return (
    <Show when={showAddPlayerModal()}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
          <h2 class="text-2xl font-bold mb-4 text-brand-500">Add New Player</h2>
          <input
            type="text"
            placeholder="Player Name"
            value={newPlayerName()}
            onInput={(e) => setNewPlayerName(e.target.value)}
            class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-400 focus:border-transparent mb-4 box-border text-lg"
          />
          <div class="flex justify-end space-x-4">
            <button
              class="px-6 py-3 bg-brand-500 text-white text-lg rounded-md cursor-pointer hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400"
              onClick={addPlayerAndCloseModal}
            >
              Add
            </button>
            <button
              class="px-6 py-3 bg-gray-500 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-gray-400"
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