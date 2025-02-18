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