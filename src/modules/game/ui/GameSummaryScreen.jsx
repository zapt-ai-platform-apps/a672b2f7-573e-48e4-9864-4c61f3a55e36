import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/app/context/AppProvider';
import GoalsList from '@/modules/game/ui/GoalsList';
import PlayerPlaytimes from '@/modules/game/ui/PlayerPlaytimes';
import FinalScore from '@/modules/game/ui/FinalScore';
import ShareSummaryButton from '@/modules/game/ui/ShareSummaryButton';

function GameSummaryScreen() {
  const { playerData, goals, ourScore, opponentScore, includeGKPlaytime, resetGame } = useAppContext();
  const navigate = useNavigate();

  const getTotalPlayTime = (player) => {
    let total = 0;
    for (const interval of player.playIntervals) {
      if (!includeGKPlaytime && interval.isGoalkeeper) {
        continue;
      }
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      }
    }
    return Math.floor(total / 1000);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  const handleBackToHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="p-4 md:p-8 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-brand-500 dark:text-brand-400">Game Summary</h1>
        <FinalScore ourScore={ourScore} opponentScore={opponentScore} />
        <GoalsList goals={goals} />
        <PlayerPlaytimes
          playerData={playerData}
          includeGKPlaytime={includeGKPlaytime}
          getTotalPlayTime={getTotalPlayTime}
          formatTime={formatTime}
        />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6 md:mt-8">
          <button
            className="px-6 py-3 md:px-8 md:py-4 bg-brand-500 text-white text-base md:text-lg rounded-md cursor-pointer hover:bg-brand-600 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-400 w-full md:w-auto"
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