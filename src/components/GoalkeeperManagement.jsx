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

    setPlayerData(
      playerData().map((player) => {
        if (player.name === playerName) {
          // New goalkeeper
          if (isRunning() && player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              // Close previous interval
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            // Start new interval with isGoalkeeper: true
            player.playIntervals.push({
              startTime: Date.now(),
              endTime: null,
              isGoalkeeper: true,
            });
          }
          return { ...player, isGoalkeeper: true };
        } else if (player.name === previousGoalkeeperName) {
          // Previous goalkeeper
          if (isRunning() && player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              // Close previous interval
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            // Start new interval with isGoalkeeper: false
            player.playIntervals.push({
              startTime: Date.now(),
              endTime: null,
              isGoalkeeper: false,
            });
          }
          return { ...player, isGoalkeeper: false };
        } else {
          return player;
        }
      })
    );

    setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);

    updatePlayerLists();
  };

  const availableGoalkeepers = () =>
    onFieldPlayers().filter((player) => player.name !== goalkeeper());

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
        availablePlayers={availableGoalkeepers}
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