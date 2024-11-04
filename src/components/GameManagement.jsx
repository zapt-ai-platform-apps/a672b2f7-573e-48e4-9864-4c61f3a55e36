import { createSignal, onCleanup, For, Show, createEffect } from 'solid-js';

function GameManagement(props) {
  const { numOnField, matchLength, playerData, setPlayerData, onEndGame } = props;
  const [isRunning, setIsRunning] = createSignal(false);
  const [timeElapsed, setTimeElapsed] = createSignal(0);
  const [goalkeeper, setGoalkeeper] = createSignal(null);

  const [selectedOffPlayer, setSelectedOffPlayer] = createSignal('');
  const [selectedOnPlayer, setSelectedOnPlayer] = createSignal('');

  let timer = null;

  onCleanup(() => {
    if (timer !== null) {
      clearInterval(timer);
    }
  });

  createEffect(() => {
    if (isRunning()) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
        updatePlayTimes();
      }, 1000);
    } else {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }
  });

  const updatePlayTimes = () => {
    setPlayerData(
      playerData().map((player) => {
        if (player.isOnField && !player.isGoalkeeper) {
          return { ...player, totalPlayTime: player.totalPlayTime + 1 };
        }
        return player;
      })
    );
  };

  const makeSubstitution = () => {
    if (selectedOffPlayer() && selectedOnPlayer()) {
      const offPlayer = playerData().find((p) => p.name === selectedOffPlayer());
      const onPlayer = playerData().find((p) => p.name === selectedOnPlayer());

      if (offPlayer && onPlayer) {
        setPlayerData(
          playerData().map((player) => {
            if (player.name === offPlayer.name) {
              return { ...player, isOnField: false };
            }
            if (player.name === onPlayer.name) {
              return { ...player, isOnField: true };
            }
            return player;
          })
        );
        setSelectedOffPlayer('');
        setSelectedOnPlayer('');
      }
    } else {
      alert('Please select both players for substitution.');
    }
  };

  const assignGoalkeeper = (player) => {
    if (goalkeeper() && goalkeeper().name === player.name) {
      setPlayerData(
        playerData().map((p) =>
          p.name === player.name ? { ...p, isGoalkeeper: false } : p
        )
      );
      setGoalkeeper(null);
    } else {
      if (goalkeeper()) {
        setPlayerData(
          playerData().map((p) =>
            p.name === goalkeeper().name ? { ...p, isGoalkeeper: false } : p
          )
        );
      }
      setPlayerData(
        playerData().map((p) =>
          p.name === player.name ? { ...p, isGoalkeeper: true } : p
        )
      );
      setGoalkeeper(player);
    }
  };

  const handleEndGame = () => {
    setIsRunning(false);
    onEndGame();
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning());
  };

  return (
    <div class="min-h-screen flex flex-col">
      <h1 class="text-3xl font-bold mb-4 text-green-600">Game Management</h1>
      <div class="flex justify-between items-center mb-4">
        <div>
          <span class="font-semibold">Time Elapsed: </span>
          {Math.floor(timeElapsed() / 60)}:{('0' + (timeElapsed() % 60)).slice(-2)} /{' '}
          {matchLength()} minutes
        </div>
        <div>
          <button
            class={`px-4 py-2 mr-2 ${
              isRunning()
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
            onClick={toggleTimer}
          >
            {isRunning() ? 'Pause' : 'Start'}
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out"
            onClick={handleEndGame}
          >
            End Game
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 md:pr-4">
          <h2 class="text-2xl font-bold mb-2 text-green-600">Players on Field</h2>
          <ul>
            <For each={playerData().filter((player) => player.isOnField)}>
              {(player) => (
                <li class="flex justify-between items-center mb-2">
                  <div>
                    {player.name}{' '}
                    {player.isGoalkeeper && (
                      <span class="text-yellow-500 font-semibold">(GK)</span>
                    )}
                  </div>
                  <div class="flex items-center">
                    <span class="mr-4">{player.totalPlayTime} sec</span>
                    <button
                      class="px-2 py-1 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out"
                      onClick={() => assignGoalkeeper(player)}
                    >
                      {player.isGoalkeeper ? 'Remove GK' : 'Assign GK'}
                    </button>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div class="md:w-1/2 md:pl-4">
          <h2 class="text-2xl font-bold mb-2 text-green-600">Players Off Field</h2>
          <ul>
            <For each={playerData().filter((player) => !player.isOnField)}>
              {(player) => (
                <li class="flex justify-between items-center mb-2">
                  <div>{player.name}</div>
                  <div>
                    <span>{player.totalPlayTime} sec</span>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      <div class="my-4">
        <h2 class="text-2xl font-bold mb-2 text-green-600">Substitution</h2>
        <div class="flex flex-col md:flex-row items-start md:items-center">
          <div class="md:w-1/2 md:pr-4">
            <label class="block font-semibold mb-2">Select Player to Sub Off:</label>
            <select
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border"
              value={selectedOffPlayer()}
              onChange={(e) => setSelectedOffPlayer(e.target.value)}
            >
              <option value="" disabled>
                Select Player
              </option>
              <For each={playerData().filter((player) => player.isOnField && !player.isGoalkeeper)}>
                {(player) => (
                  <option value={player.name}>{player.name}</option>
                )}
              </For>
            </select>
          </div>
          <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0">
            <label class="block font-semibold mb-2">Select Player to Sub On:</label>
            <select
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border"
              value={selectedOnPlayer()}
              onChange={(e) => setSelectedOnPlayer(e.target.value)}
            >
              <option value="" disabled>
                Select Player
              </option>
              <For each={playerData().filter((player) => !player.isOnField)}>
                {(player) => (
                  <option value={player.name}>{player.name}</option>
                )}
              </For>
            </select>
          </div>
        </div>
        <button
          class="mt-4 w-full py-2 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={makeSubstitution}
        >
          Confirm Substitution
        </button>
      </div>
    </div>
  );
}

export default GameManagement;