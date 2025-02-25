import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state';
import GoalsList from '../../features/GameSummary/components/GoalsList';
import PlayerPlaytimes from '../../features/GameSummary/components/PlayerPlaytimes';
import FinalScore from '../../features/GameSummary/components/FinalScore';
import ShareSummaryButton from '../../features/GameSummary/components/ShareSummaryButton';
import { formatTime } from '../../shared/models/timeUtils';
import { createGetTotalPlayTime } from './utils';
import { Player } from '../../types/GameTypes';

export default function GameSummaryScreen(): JSX.Element {
  const { playerData, goals, ourScore, opponentScore, includeGKPlaytime, resetGame } = useStateContext();

  const getTotalPlayTime = createGetTotalPlayTime(includeGKPlaytime);

  const playersWithDefaults = playerData.map((player: Player) => ({
    ...player,
    totalPlayTime: player.totalPlayTime || 0,
    isOnField: typeof player.isOnField === 'boolean' ? player.isOnField : false,
    isGoalkeeper: typeof player.isGoalkeeper === 'boolean' ? player.isGoalkeeper : false,
    status: player.status || 'active',
    minutesPlayed: player.minutesPlayed || Math.floor(player.totalPlayTime / 60000),
    position: player.position || { x: null, y: null }
  }));

  const navigate = useNavigate();

  const handleBackToHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col p-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Game Summary</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <FinalScore ourScore={ourScore} opponentScore={opponentScore} />
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <GoalsList goals={goals} />
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <PlayerPlaytimes
            playerData={playersWithDefaults}
            includeGKPlaytime={includeGKPlaytime}
            getTotalPlayTime={getTotalPlayTime}
            formatTime={formatTime}
          />
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleBackToHome}
          >
            Back to Home
          </button>
          <ShareSummaryButton
            ourScore={ourScore}
            opponentScore={opponentScore}
            playerData={playersWithDefaults}
            goals={goals}
            includeGKPlaytime={includeGKPlaytime}
            getTotalPlayTime={getTotalPlayTime}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
}