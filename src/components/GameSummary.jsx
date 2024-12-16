import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import { createSignal } from 'solid-js';
import GoalsList from './GoalsList';
import PlayerPlaytimes from './PlayerPlaytimes';
import FinalScore from './FinalScore';
import ShareSummaryButton from './ShareSummaryButton';

function GameSummary(props) {
  const { playerData, goals, ourScore, opponentScore, includeGKPlaytime, resetGame } = props;
  const navigate = useNavigate();

  const getTotalPlayTime = (player) => {
    let total = 0;
    for (const interval of player.playIntervals) {
      if (!includeGKPlaytime() && interval.isGoalkeeper) {
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
    <div class="min-h-screen flex flex-col text-gray-800 dark:bg-gray-900 dark:text-white">
      <div class="p-8 flex-grow">
        <h1 class="text-4xl font-bold mb-8 text-green-600 dark:text-green-400">Game Summary</h1>

        <FinalScore ourScore={ourScore} opponentScore={opponentScore} />

        <GoalsList goals={goals} />

        <PlayerPlaytimes
          playerData={playerData}
          includeGKPlaytime={includeGKPlaytime}
          getTotalPlayTime={getTotalPlayTime}
          formatTime={formatTime}
        />

        <div class="flex space-x-4 mt-8">
          <button
            class="px-8 py-4 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
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
      <Footer />
    </div>
  );
}

export default GameSummary;