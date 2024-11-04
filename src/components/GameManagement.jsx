import {
  createSignal,
  onCleanup,
  For,
  Show,
  createEffect,
  onMount,
} from 'solid-js';

function GameManagement(props) {
  const {
    numOnField,
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    onEndGame,
  } = props;
  const [isRunning, setIsRunning] = createSignal(false);
  const [timeElapsed, setTimeElapsed] = createSignal(0);

  const [selectedOnPlayer, setSelectedOnPlayer] = createSignal('');

  const [onFieldPlayers, setOnFieldPlayers] = createSignal([]);
  const [offFieldPlayers, setOffFieldPlayers] = createSignal([]);

  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = createSignal(null);

  const [showGKModal, setShowGKModal] = createSignal(false);

  const [newPlayerName, setNewPlayerName] = createSignal('');

  let timer = null;

  onMount(() => {
    updatePlayerLists();
    startUITimer();
  });

  onCleanup(() => {
    if (timer !== null) {
      clearInterval(timer);
    }
    if (uiTimer !== null) {
      clearInterval(uiTimer);
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

  const updatePlayerLists = () => {
    setOnFieldPlayers(
      playerData()
        .filter((player) => player.isOnField)
        .sort((a, b) => a.totalPlayTime - b.totalPlayTime)
    );
    setOffFieldPlayers(
      playerData()
        .filter((player) => !player.isOnField)
        .sort((a, b) => a.totalPlayTime - b.totalPlayTime)
    );
  };

  // UI Timer to update the interface every second
  let uiTimer = null;
  const startUITimer = () => {
    uiTimer = setInterval(() => {
      updatePlayerLists();
    }, 1000);
  };

  const makeSubstitution = () => {
    if (selectedSubOffPlayer() && selectedOnPlayer()) {
      const offPlayer = selectedSubOffPlayer();
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
        setSelectedSubOffPlayer(null);
        setSelectedOnPlayer('');
        // Update the substitution lists
        updatePlayerLists();
      }
    } else {
      alert('Please select a player to sub off and on.');
    }
  };

  const handlePlayerClick = (player) => {
    setSelectedSubOffPlayer(player);
  };

  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName) => {
    const previousGoalkeeperName = goalkeeper();

    // Update the player data to set the new goalkeeper
    setPlayerData(
      playerData().map((player) => ({
        ...player,
        isGoalkeeper: player.name === playerName,
      }))
    );
    setGoalkeeper(playerName);
    setShowGKModal(false);

    // Check if the previous goalkeeper is now an outfield player
    if (previousGoalkeeperName && previousGoalkeeperName !== playerName) {
      // The previous goalkeeper is now an outfield player
      // Need to update their totalPlayTime

      // Find the minimum totalPlayTime among current players who are not the goalkeeper
      const nonGKPlayers = playerData().filter(
        (p) => p.name !== previousGoalkeeperName && !p.isGoalkeeper
      );
      const minPlayTime = Math.min(...nonGKPlayers.map((p) => p.totalPlayTime));

      // Update the previous goalkeeper's totalPlayTime
      setPlayerData(
        playerData().map((player) => {
          if (player.name === previousGoalkeeperName) {
            return {
              ...player,
              totalPlayTime: minPlayTime,
            };
          }
          return player;
        })
      );
    }
    updatePlayerLists();
  };

  const handleEndGame = () => {
    setIsRunning(false);
    onEndGame();
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning());
  };

  // Set default player to sub on
  createEffect(() => {
    if (offFieldPlayers().length > 0) {
      const defaultSubOnPlayer = offFieldPlayers().reduce(
        (prev, current) =>
          current.totalPlayTime < prev.totalPlayTime ? current : prev,
        offFieldPlayers()[0]
      );
      setSelectedOnPlayer(defaultSubOnPlayer.name);
    } else {
      setSelectedOnPlayer('');
    }
  });

  const addNewPlayer = () => {
    if (newPlayerName().trim() !== '') {
      // Find the minimum totalPlayTime among current players who are not the current goalkeeper
      const nonGKPlayers = playerData().filter((p) => !p.isGoalkeeper);
      const minPlayTime =
        nonGKPlayers.length > 0
          ? Math.min(...nonGKPlayers.map((p) => p.totalPlayTime))
          : 0;

      setPlayerData([
        ...playerData(),
        {
          name: newPlayerName().trim(),
          totalPlayTime: minPlayTime,
          isOnField: false,
          isGoalkeeper: false,
        },
      ]);
      setNewPlayerName('');
      updatePlayerLists();
    }
  };

  return (
    <div class="h-full flex flex-col text-gray-800">
      <h1 class="text-3xl font-bold mb-4 text-green-600">Game Management</h1>
      <div class="flex justify-between items-center mb-4">
        <div>
          <span class="font-semibold">Time Elapsed: </span>
          {Math.floor(timeElapsed() / 60)}:
          {('0' + (timeElapsed() % 60)).slice(-2)}
        </div>
        <div>
          <button
            class={`px-4 py-2 mr-2 cursor-pointer ${
              isRunning()
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white rounded-lg hover:scale-105 transition duration-300 ease-in-out`}
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
            <For each={onFieldPlayers()}>
              {(player) => (
                <li
                  class={`flex justify-between items-center mb-2 cursor-pointer ${
                    selectedSubOffPlayer() && selectedSubOffPlayer().name === player.name
                      ? 'bg-blue-200'
                      : ''
                  }`}
                  onClick={() => handlePlayerClick(player)}
                >
                  <div>
                    {player.name}{' '}
                    {player.isGoalkeeper && (
                      <span class="text-yellow-500 font-semibold">(GK)</span>
                    )}
                  </div>
                  <div class="flex items-center">
                    <span class="mr-4">{player.totalPlayTime} sec</span>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div class="md:w-1/2 md:pl-4">
          <h2 class="text-2xl font-bold mb-2 text-green-600">
            Players Off Field
          </h2>
          <ul>
            <For each={offFieldPlayers()}>
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
            <label class="block font-semibold mb-2">Player to Sub Off:</label>
            <div class="p-2 border border-gray-300 rounded-lg box-border">
              {selectedSubOffPlayer()
                ? selectedSubOffPlayer().name
                : 'Select a player'}
            </div>
          </div>
          <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0">
            <label class="block font-semibold mb-2">
              Select Player to Sub On:
            </label>
            <select
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border"
              value={selectedOnPlayer()}
              onChange={(e) => setSelectedOnPlayer(e.target.value)}
            >
              <For each={offFieldPlayers()}>
                {(player) => (
                  <option value={player.name}>{player.name}</option>
                )}
              </For>
            </select>
          </div>
        </div>
        <button
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={makeSubstitution}
        >
          Make Substitution
        </button>
      </div>
      <div class="my-4">
        <button
          class="px-4 py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={assignGoalkeeper}
        >
          Change Goalkeeper
        </button>
        <Show when={showGKModal()}>
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg">
              <h2 class="text-2xl font-bold mb-4 text-green-600">
                Assign Goalkeeper
              </h2>
              <ul>
                <For each={onFieldPlayers()}>
                  {(player) => (
                    <li
                      class="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
                      onClick={() => confirmGoalkeeper(player.name)}
                    >
                      <div>{player.name}</div>
                      <div>
                        {player.isGoalkeeper && (
                          <span class="text-yellow-500 font-semibold">(GK)</span>
                        )}
                      </div>
                    </li>
                  )}
                </For>
              </ul>
              <button
                class="mt-4 w-full py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={() => setShowGKModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Show>
      </div>
      <div class="my-4">
        <h2 class="text-2xl font-bold mb-2 text-green-600">Add New Player</h2>
        <div class="flex">
          <input
            type="text"
            class="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border"
            placeholder="Player Name"
            value={newPlayerName()}
            onInput={(e) => setNewPlayerName(e.target.value)}
          />
          <button
            class="p-2 bg-green-500 text-white rounded-r-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={addNewPlayer}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameManagement;