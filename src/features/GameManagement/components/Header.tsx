import React from 'react';

interface HeaderProps {
  isRunning: boolean;
  toggleTimer: () => void;
  getTimeElapsed: () => number;
  handleEndGame: () => void;
  ourScore: number;
  opponentScore: number;
}

function Header({ isRunning, toggleTimer, getTimeElapsed, handleEndGame, ourScore, opponentScore }: HeaderProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Time: {formatTime(getTimeElapsed())}
          </div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Score: {ourScore} - {opponentScore}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleTimer}
            className={`px-6 py-2 rounded-lg font-medium transition-colors
              ${isRunning 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleEndGame}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            End Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;