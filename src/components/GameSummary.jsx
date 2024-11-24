import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import { For, Show } from 'solid-js';
import { createSignal } from 'solid-js';
import * as Sentry from '@sentry/browser';

function GameSummary(props) {
  const { playerData, goals, ourScore, opponentScore, resetGame } = props;
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = createSignal(false);

  const getTotalPlayTime = (player) => {
    let total = 0;
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += 0;
      }
    }
    return Math.floor(total / 1000); // return total playtime in seconds
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

  const sortedPlayerData = () =>
    [...playerData()].sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a));

  const goalsByPlayer = () => {
    const counts = {};
    goals()
      .filter((goal) => goal.team === 'our')
      .forEach((goal) => {
        const scorer = goal.scorerName;
        if (counts[scorer]) {
          counts[scorer]++;
        } else {
          counts[scorer] = 1;
        }
      });
    return counts;
  };

  const handleShareSummary = async () => {
    setIsSharing(true);
    try {
      // Generate the summary text
      let summaryText = `Final Score: Our Team ${ourScore()} - ${opponentScore()} Opponent Team\n\n`;

      // Compute goals by player
      const goalsByPlayerData = {};
      goals()
        .filter((goal) => goal.team === 'our')
        .forEach((goal) => {
          const scorer = goal.scorerName;
          if (goalsByPlayerData[scorer]) {
            goalsByPlayerData[scorer]++;
          } else {
            goalsByPlayerData[scorer] = 1;
          }
        });

      summaryText += 'Goals by Our Team:\n';
      if (Object.keys(goalsByPlayerData).length > 0) {
        Object.entries(goalsByPlayerData).forEach(([playerName, goalCount]) => {
          summaryText += `- ${playerName}: ${goalCount} goal${goalCount !== 1 ? 's' : ''}\n`;
        });
      } else {
        summaryText += 'No goals scored by our team.\n';
      }

      summaryText += '\nPlayer Playtimes:\n';
      sortedPlayerData().forEach((player) => {
        summaryText += `- ${player.name}: ${formatTime(getTotalPlayTime(player))}\n`;
      });

      // Use Web Share API
      if (navigator.share) {
        await navigator.share({
          title: 'Match Summary',
          text: summaryText,
        });
      } else {
        alert('Sharing not supported on this browser.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        Sentry.captureException(error);
        alert('An error occurred while sharing. Please try again.');
      }
      // If it's an AbortError (user canceled the share), do nothing
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div class="min-h-screen flex flex-col text-gray-800">
      <div class="p-8 flex-grow">
        <h1 class="text-4xl font-bold mb-8 text-green-600">Game Summary</h1>

        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-green-600">Final Score</h2>
          <p class="text-xl">
            Our Team {ourScore()} - {opponentScore()} Opponent Team
          </p>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-green-600">Goals by Our Team</h2>
          <Show when={Object.keys(goalsByPlayer()).length > 0} fallback={<p>No goals scored by our team.</p>}>
            <ul>
              <For each={Object.entries(goalsByPlayer())}>
                {([playerName, goalCount]) => (
                  <li class="mb-2">
                    <p>{playerName}: {goalCount} goal{goalCount !== 1 ? 's' : ''}</p>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-green-600">Player Playtimes</h2>
          <ul>
            <For each={sortedPlayerData()}>
              {(player) => (
                <li class="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-md">
                  <div class="font-medium text-lg">{player.name}</div>
                  <div>{formatTime(getTotalPlayTime(player))}</div>
                </li>
              )}
            </For>
          </ul>
        </div>

        <div class="flex space-x-4 mt-8">
          <button
            class="px-8 py-4 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleBackToHome}
          >
            Back to Home
          </button>
          <button
            class={`px-8 py-4 bg-blue-500 text-white text-lg rounded-lg ${
              isSharing() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-600 hover:scale-105'
            } transition duration-300 ease-in-out`}
            onClick={handleShareSummary}
            disabled={isSharing()}
          >
            {isSharing() ? 'Sharing...' : 'Share Summary'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GameSummary;