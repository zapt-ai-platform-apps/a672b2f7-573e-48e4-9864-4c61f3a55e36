import React from 'react';

function Header({ isRunning, toggleTimer, getTimeElapsed, handleEndGame, ourScore, opponentScore }) {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
      <div className="mb-4 md:mb-0">
        <span className="font-semibold">Time Elapsed: </span>
        {formatTime(getTimeElapsed())}
      </div>
      <div className="mb-4 md:mb-0">
        <span className="font-semibold">Score: </span>
        {ourScore} - {opponentScore}
      </div>
      <div className="flex space-x-4">
        <button
          className={`px-8 py-4 ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white text-lg rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
          onClick={toggleTimer}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-8 py-4 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleEndGame}
        >
          End Game
        </button>
      </div>
    </div>
  );
}

export default Header;