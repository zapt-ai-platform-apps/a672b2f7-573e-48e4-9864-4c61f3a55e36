import { createSignal } from 'solid-js';

function GameActions(props) {
  const {
    assignGoalkeeper,
    handleRemoveLastGoal,
    setShowGoalModal,
    setShowAddPlayerModal,
    handleIncreasePlayers,
    handleDecreasePlayers,
    isRunning,
  } = props;

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <button
        class="px-4 py-6 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
        onClick={() => setShowGoalModal(true)}
      >
        Goal Scored
      </button>
      <button
        class="px-4 py-6 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
        onClick={handleRemoveLastGoal}
      >
        Remove Last Goal
      </button>
      <button
        class="px-4 py-6 bg-yellow-500 text-white text-lg rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300 ease-in-out"
        onClick={assignGoalkeeper}
      >
        Change Goalkeeper
      </button>
      <button
        class="px-4 py-6 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={() => setShowAddPlayerModal(true)}
      >
        Add New Player
      </button>
      <button
        class="px-4 py-6 bg-indigo-500 text-white text-lg rounded-lg cursor-pointer hover:bg-indigo-600 transition duration-300 ease-in-out"
        onClick={handleIncreasePlayers}
      >
        Increase Players on Field
      </button>
      <button
        class="px-4 py-6 bg-purple-500 text-white text-lg rounded-lg cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out"
        onClick={handleDecreasePlayers}
      >
        Decrease Players on Field
      </button>
    </div>
  );
}

export default GameActions;