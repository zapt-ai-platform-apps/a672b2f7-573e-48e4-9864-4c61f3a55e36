import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import { For } from 'solid-js';

function GameSummary(props) {
  const { playerData, goals, ourScore, opponentScore, resetGame } = props;
  const navigate = useNavigate();

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

  return (
    <div class="min-h-screen flex flex-col text-gray-800">
      <div class="p-4 flex-grow">
        <h1 class="text-3xl font-bold mb-4 text-green-600">Game Summary</h1>

        <div class="mb-4">
          <h2 class="text-2xl font-bold mb-2 text-green-600">Final Score</h2>
          <p class="text-xl">
            Our Team {ourScore()} - {opponentScore()} Opponent Team
          </p>
        </div>

        <div class="mb-4">
          <h2 class="text-2xl font-bold mb-2 text-green-600">Goals by Our Team</h2>
          <For each={goals().filter((goal) => goal.team === 'our')}>
            {(goal) => (
              <div class="mb-2">
                <p>
                  {goal.scorerName} scored at {formatTime(goal.time)} minutes
                </p>
              </div>
            )}
          </For>
        </div>

        <div class="mb-4">
          <h2 class="text-2xl font-bold mb-2 text-green-600">Goals by Opponent Team</h2>
          <For each={goals().filter((goal) => goal.team === 'opponent')}>
            {(goal) => (
              <div class="mb-2">
                <p>
                  Opponent scored at {formatTime(goal.time)} minutes
                </p>
              </div>
            )}
          </For>
        </div>

        <div class="mb-4">
          <h2 class="text-2xl font-bold mb-2 text-green-600">Player Playtimes</h2>
          <ul>
            <For each={playerData()}>
              {(player) => (
                <li class="flex justify-between items-center mb-2 p-4 bg-white rounded-lg shadow-md">
                  <div class="font-medium text-lg">{player.name}</div>
                  <div>{formatTime(getTotalPlayTime(player))}</div>
                </li>
              )}
            </For>
          </ul>
        </div>

        <button
          class="px-8 py-4 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default GameSummary;