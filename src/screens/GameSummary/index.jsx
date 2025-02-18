import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../state';
import GoalsList from '../../features/GameSummary/components/GoalsList.jsx';
import PlayerPlaytimes from '../../features/GameSummary/components/PlayerPlaytimes.jsx';
import FinalScore from '../../features/GameSummary/components/FinalScore.jsx';
import ShareSummaryButton from '../../features/GameSummary/components/ShareSummaryButton.jsx';
import { calculateTotalPlayTime } from '../../shared/models/playerUtils.js';
import { formatTime } from '../../shared/models/timeUtils.js';

function GameSummaryScreen() {
  const { playerData, goals, ourScore, opponentScore, includeGKPlaytime, resetGame } = useStateContext();

  const getTotalPlayTime = (player) => {
    return calculateTotalPlayTime(player, includeGKPlaytime, false);
  };

  const navigate = useNavigate();

  const handleBackToHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-8 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-brand-500 dark:text-brand-400">Game Summary</h1>
        <FinalScore ourScore={ourScore} opponentScore={opponentScore} />
        <GoalsList goals={goals} />
        <PlayerPlaytimes
          playerData={playerData}
          includeGKPlaytime={includeGKPlaytime}
          getTotalPlayTime={getTotalPlayTime}
          formatTime={formatTime}
        />
        <div className="flex space-x-4 mt-8">
          <button
            className="px-8 py-4 bg-brand-500 text-white text-lg rounded-md cursor-pointer hover:bg-brand-600 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-400"
            onClick={handleBackToHome}
          >
            Back to Home
          </button>
          <ShareSummaryButton
            ourScore={ourScore}
            opponentScore={opponentScore}
            playerData={playerData}
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

export default GameSummaryScreen;