import React from 'react';
import { formatTime } from '@/modules/game/utils/timeFormatter';

function Header({ isRunning, toggleTimer, getTimeElapsed, handleEndGame, ourScore, opponentScore }) {
  return (
    <div className="flex flex-col mb-6 md:mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 md:mb-0">
        <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center">
          <span className="text-sm md:text-base">
            <span className="font-semibold">Time: </span>
            {formatTime(getTimeElapsed())}
          </span>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center">
          <span className="text-sm md:text-base">
            <span className="font-semibold">Score: </span>
            {ourScore} - {opponentScore}
          </span>
        </div>
        
        <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-2 mt-2 md:mt-0">
          <button
            className={`py-3 md:py-4 ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out text-sm md:text-base`}
            onClick={toggleTimer}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button
            className="py-3 md:py-4 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out text-sm md:text-base"
            onClick={handleEndGame}
          >
            End Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;