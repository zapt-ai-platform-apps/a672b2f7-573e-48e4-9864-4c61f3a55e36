import React from 'react';

export function Header({ isRunning, toggleTimer, getTimeElapsed, handleEndGame, ourScore, opponentScore }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <button 
            className="mr-4 px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
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
          className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
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
          className="mr-2 px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
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