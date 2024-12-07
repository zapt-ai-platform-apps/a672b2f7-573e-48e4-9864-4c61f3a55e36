import { createSignal } from 'solid-js';
import AssignGoalkeeperModal from './AssignGoalkeeperModal';
import ConfirmGoalkeeperModal from './ConfirmGoalkeeperModal';

function GoalkeeperManagement(props) {
  const {
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    isRunning,
    includeGKPlaytime,
    updatePlayerLists,
    onFieldPlayers,
  } = props;

  const [showGKModal, setShowGKModal] = createSignal(false);
  const [showGKConfirmModal, setShowGKConfirmModal] = createSignal(false);
  const [selectedNewGoalkeeper, setSelectedNewGoalkeeper] = createSignal(null);

  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName) => {
    const previousGoalkeeperName = goalkeeper();

    // Update the player data to set the new goalkeeper
    setPlayerData(
      playerData().map((player) => {
        if (player.name === playerName) {
          // New goalkeeper, end their current play interval
          if (isRunning() && player.playIntervals.length > 0 && player.isOnField) {
            player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
          }
          return { ...player, isGoalkeeper: true };
        }
        if (player.name === previousGoalkeeperName) {
          // Previous goalkeeper, start a new play interval if they are on field and game is running
          if (isRunning() && player.isOnField) {
            player.playIntervals.push({ startTime: Date.now(), endTime: null });
          }
          return { ...player, isGoalkeeper: false };
        }
        return player;
      })
    );
    setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);

    updatePlayerLists();
  };

  return (
    <>
      <div class="bg-white p-8 rounded-lg shadow-md mb-8">
        <button
          class="px-8 py-4 bg-yellow-500 text-white text-lg rounded-lg cursor-pointer hover:bg-yellow-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={assignGoalkeeper}
        >
          Change Goalkeeper
        </button>
      </div>

      <AssignGoalkeeperModal
        showGKModal={showGKModal}
        onFieldPlayers={onFieldPlayers}
        setSelectedNewGoalkeeper={setSelectedNewGoalkeeper}
        setShowGKConfirmModal={setShowGKConfirmModal}
        setShowGKModal={setShowGKModal}
      />

      <ConfirmGoalkeeperModal
        showGKConfirmModal={showGKConfirmModal}
        selectedNewGoalkeeper={selectedNewGoalkeeper}
        confirmGoalkeeper={confirmGoalkeeper}
        setShowGKConfirmModal={setShowGKConfirmModal}
      />
    </>
  );
}

export default GoalkeeperManagement;