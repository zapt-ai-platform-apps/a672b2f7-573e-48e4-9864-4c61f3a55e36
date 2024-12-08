import AdjustPlayersModal from './AdjustPlayersModal';
import ConfirmAdjustPlayersModal from './ConfirmAdjustPlayersModal';
import useAdjustPlayers from '../hooks/useAdjustPlayers';

function AdjustPlayers(props) {
  const {
    showAdjustModal,
    setShowAdjustModal,
    adjustType,
    setAdjustType,
    selectedPlayer,
    setSelectedPlayer,
    showConfirmModal,
    setShowConfirmModal,
    handleIncreasePlayers,
    handleDecreasePlayers,
    confirmAdjustment,
    onFieldPlayers,
    offFieldPlayers,
  } = useAdjustPlayers(props);

  return (
    <>
      <div class="flex space-x-4 mb-8">
        <button
          class="px-6 py-3 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleIncreasePlayers}
        >
          Increase Players on Field
        </button>
        <button
          class="px-6 py-3 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleDecreasePlayers}
        >
          Decrease Players on Field
        </button>
      </div>

      <AdjustPlayersModal
        showAdjustModal={showAdjustModal}
        setShowAdjustModal={setShowAdjustModal}
        adjustType={adjustType}
        onFieldPlayers={onFieldPlayers}
        offFieldPlayers={offFieldPlayers}
        setSelectedPlayer={setSelectedPlayer}
        setShowConfirmModal={setShowConfirmModal}
      />

      <ConfirmAdjustPlayersModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        selectedPlayer={selectedPlayer}
        adjustType={adjustType}
        confirmAdjustment={confirmAdjustment}
      />
    </>
  );
}

export default AdjustPlayers;