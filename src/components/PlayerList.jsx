import { For } from 'solid-js';

function PlayerList(props) {
  const { players, title, selectedPlayer, handlePlayerClick, getTotalPlayTime, message } = props;

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  return (
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full">
      <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        {title}
      </h2>
      <p class="mb-2 text-gray-600 dark:text-gray-300 text-sm">{message}</p>
      <ul>
        <For each={players()}>
          {(player) => (
            <li
              class={`flex justify-between items-center mb-2 p-4 rounded-lg cursor-pointer ${
                selectedPlayer() && selectedPlayer().name === player.name
                  ? 'bg-blue-200 dark:bg-blue-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handlePlayerClick && handlePlayerClick(player)}
            >
              <div class="font-medium text-lg text-gray-800 dark:text-white">
                {player.name}{' '}
                {player.isGoalkeeper && (
                  <span class="text-yellow-500 font-semibold">(GK)</span>
                )}
              </div>
              <div>
                <span class="text-sm text-gray-600 dark:text-gray-300">
                  {formatTime(getTotalPlayTime(player))}
                </span>
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export default PlayerList;