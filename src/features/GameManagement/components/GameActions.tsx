import React from 'react';

interface GameActionsProps {
  assignGoalkeeper: () => void;
  handleRemoveLastGoal: () => void;
  setShowGoalModal: (show: boolean) => void;
  setShowAddPlayerModal: (show: boolean) => void;
  handleIncreasePlayers: () => void;
  handleDecreasePlayers: () => void;
  isRunning: boolean;
}

export function GameActions({
  assignGoalkeeper,
  handleRemoveLastGoal,
  setShowGoalModal,
  setShowAddPlayerModal,
  handleIncreasePlayers,
  handleDecreasePlayers,
  isRunning,
}: GameActionsProps): JSX.Element {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <button 
        className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
        onClick={assignGoalkeeper}
      >
        Assign Goalkeeper
      </button>
      <button 
        className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer"
        onClick={handleRemoveLastGoal}
      >
        Remove Last Goal
      </button>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={() => setShowGoalModal(true)}
      >
        Add Goal
      </button>
      <button 
        className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer"
        onClick={() => setShowAddPlayerModal(true)}
      >
        Add Player
      </button>
      <button 
        className="px-4 py-2 bg-teal-600 text-white rounded cursor-pointer"
        onClick={handleIncreasePlayers}
      >
        Increase Players
      </button>
      <button 
        className="px-4 py-2 bg-red-700 text-white rounded cursor-pointer"
        onClick={handleDecreasePlayers}
      >
        Decrease Players
      </button>
    </div>
  );
}