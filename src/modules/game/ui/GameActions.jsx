import React from 'react';

function GameActions({ assignGoalkeeper, handleRemoveLastGoal, setShowGoalModal, setShowAddPlayerModal, handleIncreasePlayers, handleDecreasePlayers, isRunning }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8">
      <button
        className="px-3 py-4 md:px-4 md:py-6 bg-brand-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-brand-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-brand-400"
        onClick={() => setShowGoalModal(true)}
      >
        Goal Scored
      </button>
      
      <button
        className="px-3 py-4 md:px-4 md:py-6 bg-red-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-red-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={handleRemoveLastGoal}
      >
        Remove Last Goal
      </button>
      
      <button
        className="px-3 py-4 md:px-4 md:py-6 bg-yellow-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onClick={assignGoalkeeper}
      >
        Change Goalkeeper
      </button>
      
      <button
        className="px-3 py-4 md:px-4 md:py-6 bg-blue-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setShowAddPlayerModal(true)}
      >
        Add New Player
      </button>
      
      <button
        className="px-3 py-4 md:px-4 md:py-6 bg-indigo-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-indigo-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onClick={handleIncreasePlayers}
      >
        Increase Players
      </button>
      
      <button
        className="px-3 py-4 md:px-4 md:py-6 bg-purple-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-purple-600 transition-all duration-300 ease-in-out-custom focus:outline-none focus:ring-2 focus:ring-purple-400"
        onClick={handleDecreasePlayers}
      >
        Decrease Players
      </button>
    </div>
  );
}

export default GameActions;