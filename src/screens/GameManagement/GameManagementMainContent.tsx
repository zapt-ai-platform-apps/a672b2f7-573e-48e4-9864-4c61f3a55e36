import React from 'react';
import { Player } from '../../types/GameTypes';

interface GameManagementMainContentProps {
  playerData: Player[];
  isRunning: boolean;
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (player: Player) => number;
  setShowGoalModal: (show: boolean) => void;
  timerControls: {
    isRunning: boolean;
    timeElapsed: number;
    toggleTimer: () => boolean;
    startTimer?: () => void;
    stopTimer?: () => void;
    resetTimer?: () => void;
    getTimeElapsed?: () => number;
    gameIntervals?: Array<{ startTime: number; endTime?: number }>;
    startGame?: () => void;
    pauseGame?: () => void;
    now?: number;
    startUITimer?: () => void;
  };
  ourScore: number;
  opponentScore: number;
}

export default function GameManagementMainContent({
  playerData,
  isRunning,
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime,
  setShowGoalModal,
  timerControls,
  ourScore,
  opponentScore
}: GameManagementMainContentProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-3 text-white">Game Status</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-300">Our Team</p>
            <p className="text-3xl font-bold text-white">{ourScore}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-300">Time</p>
            <p className="text-2xl font-bold text-white">
              {Math.floor(timerControls.timeElapsed / 60)}:{(timerControls.timeElapsed % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-300">Opponent</p>
            <p className="text-3xl font-bold text-white">{opponentScore}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded cursor-pointer transition"
            onClick={() => timerControls.toggleTimer()}
          >
            {timerControls.isRunning ? 'Pause Game' : 'Resume Game'}
          </button>
        </div>
      </div>
      
      <div className="bg-white/5 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-3 text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded cursor-pointer transition"
            onClick={() => setShowGoalModal(true)}
          >
            Record Goal
          </button>
          <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded cursor-pointer transition"
            onClick={() => {/* Add substitution functionality */}}
          >
            Make Substitution
          </button>
        </div>
      </div>
    </div>
  );
}