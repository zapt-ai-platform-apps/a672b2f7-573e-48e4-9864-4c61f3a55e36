import { createSignal } from 'solid-js';
import AddPlayerModal from './AddPlayerModal';

function AddPlayer(props) {
  const { playerData, setPlayerData, updatePlayerLists } = props;
  const [showAddPlayerModal, setShowAddPlayerModal] = createSignal(false);
  const [newPlayerName, setNewPlayerName] = createSignal('');

  const addNewPlayer = () => {
    if (newPlayerName().trim() !== '') {
      // Find the minimum totalPlayTime among current players
      const minPlayTime =
        playerData().length > 0
          ? Math.min(...playerData().map((p) => p.totalPlayTime || 0))
          : 0;

      setPlayerData([
        ...playerData(),
        {
          name: newPlayerName().trim(),
          playIntervals: [], // Start with no play intervals
          isOnField: false,
          isGoalkeeper: false,
          totalPlayTime: minPlayTime,
        },
      ]);
      setNewPlayerName('');
      updatePlayerLists();
    }
  };

  return (
    <>
      <div class="bg-white p-8 rounded-lg shadow-md mb-8">
        <button
          class="px-8 py-4 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={() => setShowAddPlayerModal(true)}
        >
          Add New Player
        </button>
      </div>

      {/* AddPlayerModal */}
      <AddPlayerModal
        showAddPlayerModal={showAddPlayerModal}
        setShowAddPlayerModal={setShowAddPlayerModal}
        newPlayerName={newPlayerName}
        setNewPlayerName={setNewPlayerName}
        addNewPlayer={addNewPlayer}
      />
    </>
  );
}

export default AddPlayer;