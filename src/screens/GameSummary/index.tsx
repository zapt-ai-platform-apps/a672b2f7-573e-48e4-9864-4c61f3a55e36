import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state';
import GoalsList from '../../features/GameSummary/components/GoalsList';
import PlayerPlaytimes from '../../features/GameSummary/components/PlayerPlaytimes';
import FinalScore from '../../features/GameSummary/components/FinalScore';
import ShareSummaryButton from '../../features/GameSummary/components/ShareSummaryButton';
import { formatTime } from '../../shared/models/timeUtils'; // Updated import path
import { createGetTotalPlayTime } from './utils';
import { getPlayersWithDefaults } from './helpers';
import { Player } from '../../types/GameTypes';

export default function GameSummaryScreen(): JSX.Element {
  const { playerData, goals, ourScore, opponentScore, includeGKPlaytime, resetGame } = useStateContext();

  const getTotalPlayTime = createGetTotalPlayTime(includeGKPlaytime);

  const playersWithDefaults = getPlayersWithDefaults(playerData);
  
  const activePlayers = playersWithDefaults.filter(player => player.isOnField);
  const benchPlayers = playersWithDefaults.filter(player => !player.isOnField);

  const navigate = useNavigate();

  const handleBackToHome = () => {
    resetGame();
    navigate('/');
  };

  // Sanitized goals to ensure scorerName is always a string
  const sanitizedGoals = goals.map(goal => ({
    ...goal,
    scorerName: goal.scorerName || 'Unknown Player'
  }));

  return (
    <div className="min-h-screen flex flex-col p-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Game Summary</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <FinalScore ourScore={ourScore} opponentScore={opponentScore} />
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <GoalsList goals={sanitizedGoals} />
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <PlayerPlaytimes
            activePlayers={activePlayers}
            benchPlayers={benchPlayers}
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
            goals={sanitizedGoals}
            includeGKPlaytime={includeGKPlaytime}
            getTotalPlayTime={getTotalPlayTime}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
}