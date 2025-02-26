import React from 'react';

interface HeaderProps {
  isRunning: boolean;
  toggleTimer: () => void;
  getTimeElapsed: () => string;
  handleEndGame: () => void;
  ourScore: number;
  opponentScore: number;
}

export default function Header({
  isRunning,
  toggleTimer,
  getTimeElapsed,
  handleEndGame,
  ourScore,
  opponentScore
}: HeaderProps): JSX.Element {
  return (
    <div className="mb-6 p-4 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-center md:text-left bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Game Management
          </h1>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-4 bg-indigo-800/80 rounded-lg px-4 py-2">
            <div className="text-white font-bold text-xl md:text-2xl">{ourScore}</div>
            <div className="text-white opacity-80 font-medium">:</div>
            <div className="text-white font-bold text-xl md:text-2xl">{opponentScore}</div>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center md:justify-end space-x-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-800/80 text-white rounded-lg px-3 py-1">
              {getTimeElapsed()}
            </div>
            <button
              onClick={toggleTimer}
              className={`px-3 py-1 rounded-lg text-white font-medium cursor-pointer transition-colors ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
              }`}
            >
              {isRunning ? 'Pause' : 'Play'}
            </button>
            {!isRunning && (
              <button
                onClick={handleEndGame}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                End Game
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}