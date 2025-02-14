import React from 'react';

export function Header({ isRunning, toggleTimer, getTimeElapsed, handleEndGame, ourScore, opponentScore }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <button 
            className="mr-4 px-3 py-1 bg-blue-600 text-white rounded"
            onClick={toggleTimer}
          >
            {isRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
          <span className="text-xl font-semibold">Time: {getTimeElapsed()}</span>
        </div>
        <div>
          <span className="mr-2">Our Score: {ourScore}</span>
          <span>Opponent Score: {opponentScore}</span>
        </div>
      </div>
      <div className="mt-4">
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleEndGame}
        >
          End Game
        </button>
      </div>
    </div>
  );
}

export function SubstitutionPanel({ playerData, setPlayerData, isRunning, includeGKPlaytime, updatePlayerLists, onFieldPlayers, offFieldPlayers, getTotalPlayTime }) {
  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Substitution Panel</h2>
      <div>
        <span className="block mb-2">Playtime: {getTotalPlayTime()}</span>
        <button 
          className="mr-2 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => updatePlayerLists(playerData)}
        >
          Update Players
        </button>
      </div>
    </div>
  );
}

export function GameActions({ assignGoalkeeper, handleRemoveLastGoal, setShowGoalModal, setShowAddPlayerModal, handleIncreasePlayers, handleDecreasePlayers, isRunning }) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <button 
        className="px-4 py-2 bg-purple-600 text-white rounded"
        onClick={assignGoalkeeper}
      >
        Assign Goalkeeper
      </button>
      <button 
        className="px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={handleRemoveLastGoal}
      >
        Remove Last Goal
      </button>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowGoalModal(true)}
      >
        Add Goal
      </button>
      <button 
        className="px-4 py-2 bg-indigo-600 text-white rounded"
        onClick={() => setShowAddPlayerModal(true)}
      >
        Add Player
      </button>
      <button 
        className="px-4 py-2 bg-teal-600 text-white rounded"
        onClick={handleIncreasePlayers}
      >
        Increase Players
      </button>
      <button 
        className="px-4 py-2 bg-red-700 text-white rounded"
        onClick={handleDecreasePlayers}
      >
        Decrease Players
      </button>
    </div>
  );
}

export function EndGameConfirmationModal({ showEndGameConfirm, confirmEndGame, cancelEndGame }) {
  if (!showEndGameConfirm) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
        <p className="mb-4">Are you sure you want to end the game?</p>
        <div className="flex justify-end">
          <button 
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={cancelEndGame}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={confirmEndGame}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export function PitchVisualization() {
  return (
    <div className="mt-4 p-4 border rounded bg-green-100">
      <h2 className="text-2xl font-bold mb-2">Pitch Visualization</h2>
      <p>This is where the pitch will be visualized.</p>
    </div>
  );
}