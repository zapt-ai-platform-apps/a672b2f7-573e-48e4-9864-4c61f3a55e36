import {
  createSignal,
  onCleanup,
  For,
  Show,
  createEffect,
  onMount,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import EndGameConfirmationModal from './EndGameConfirmationModal';
import AssignGoalkeeperModal from './AssignGoalkeeperModal';
import ConfirmGoalkeeperModal from './ConfirmGoalkeeperModal';

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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  const [selectedOnPlayer, setSelectedOnPlayer] = createSignal('');

  const [onFieldPlayers, setOnFieldPlayers] = createSignal([]);
  const [offFieldPlayers, setOffFieldPlayers] = createSignal([]);

  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = createSignal(null);

  const [showGKModal, setShowGKModal] = createSignal(false);
  const [showGKConfirmModal, setShowGKConfirmModal] = createSignal(false);
  const [selectedNewGoalkeeper, setSelectedNewGoalkeeper] = createSignal(null);

  const [showEndGameConfirm, setShowEndGameConfirm] = createSignal(false);

  const [newPlayerName, setNewPlayerName] = createSignal('');

  let uiTimer = null;
  const navigate = useNavigate();

  onMount(() => {
    updatePlayerLists();
    startUITimer();
  });

  onCleanup(() => {
    if (uiTimer !== null) {
      clearInterval(uiTimer);
    }
  });

  const updatePlayerLists = () => {
    setOnFieldPlayers(
      playerData()
        .filter((player) => player.isOnField)
        .sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a))
    );
    setOffFieldPlayers(
      playerData()
        .filter((player) => !player.isOnField)
        .sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a))
    );
  };

  const getTotalPlayTime = (player) => {
    timeElapsed(); // Make reactive to timeElapsed
    let total = 0;
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += Date.now() - interval.startTime;
      }
    }
    return Math.floor(total / 1000); // return total playtime in seconds
  };

  // UI Timer to update the interface every second
  const startUITimer = () => {
    uiTimer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
  };

  const makeSubstitution = () => {
    if (selectedSubOffPlayer() && selectedOnPlayer()) {
      const offPlayerName = selectedSubOffPlayer().name;
      const onPlayerName = selectedOnPlayer();

      setPlayerData(
        playerData().map((player) => {
          if (player.name === offPlayerName) {
            // End the current play interval
            if (player.playIntervals.length > 0) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            return { ...player, isOnField: false };
          }
          if (player.name === onPlayerName) {
            // Start a new play interval
            return {
              ...player,
              isOnField: true,
              playIntervals: [
                ...player.playIntervals,
                { startTime: Date.now(), endTime: null },
              ],
            };
          }
          return player;
        })
      );
      setSelectedSubOffPlayer(null);
      setSelectedOnPlayer('');
      // Update the substitution lists
      updatePlayerLists();
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
      playerData().map((player) => {
        if (player.name === playerName) {
          // New goalkeeper, end their current play interval
          if (player.playIntervals.length > 0 && player.isOnField) {
            player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
          }
          return { ...player, isGoalkeeper: true };
        }
        if (player.name === previousGoalkeeperName) {
          // Previous goalkeeper, start a new play interval if they are on field
          if (player.isOnField) {
            player.playIntervals.push({ startTime: Date.now(), endTime: null });
          }
          return { ...player, isGoalkeeper: false };
        }
        return player;
      })
    );
    setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);

    updatePlayerLists();
  };

  const handleEndGame = () => {
    setShowEndGameConfirm(true);
  };

  const confirmEndGame = () => {
    setIsRunning(false);
    setShowEndGameConfirm(false);
    onEndGame();
    navigate('/');
  };

  const cancelEndGame = () => {
    setShowEndGameConfirm(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning());
    if (isRunning()) {
      // Game is starting or resuming
      // Start play intervals for all on-field players who are not goalkeepers
      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField && !player.isGoalkeeper) {
            if (
              player.playIntervals.length === 0 ||
              player.playIntervals[player.playIntervals.length - 1].endTime !== null
            ) {
              player.playIntervals.push({ startTime: Date.now(), endTime: null });
            }
          }
          return player;
        })
      );
    } else {
      // Game is pausing
      // End play intervals for all on-field players who are not goalkeepers
      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField && !player.isGoalkeeper) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
          }
          return player;
        })
      );
    }
  };

  // Set default player to sub on
  createEffect(() => {
    if (offFieldPlayers().length > 0) {
      const defaultSubOnPlayer = offFieldPlayers().reduce(
        (prev, current) =>
          getTotalPlayTime(current) < getTotalPlayTime(prev) ? current : prev,
        offFieldPlayers()[0]
      );
      setSelectedOnPlayer(defaultSubOnPlayer.name);
    } else {
      setSelectedOnPlayer('');
    }
  });

  createEffect(() => {
    updatePlayerLists();
  });

  const addNewPlayer = () => {
    if (newPlayerName().trim() !== '') {
      // Find the minimum totalPlayTime among current players who are not the current goalkeeper
      const nonGKPlayers = playerData().filter((p) => !p.isGoalkeeper);
      const minPlayTime =
        nonGKPlayers.length > 0
          ? Math.min(...nonGKPlayers.map((p) => getTotalPlayTime(p)))
          : 0;

      setPlayerData([
        ...playerData(),
        {
          name: newPlayerName().trim(),
          playIntervals: [], // Start with no play intervals
          isOnField: false,
          isGoalkeeper: false,
          totalPlayTime: minPlayTime,
        },
      ]);
      setNewPlayerName('');
      updatePlayerLists();
    }
  };

  return (
    <div class="min-h-screen p-4 flex flex-col text-gray-800">
      <h1 class="text-3xl font-bold mb-4 text-green-600">Game Management</h1>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <span class="font-semibold">Time Elapsed: </span>
          {Math.floor(timeElapsed() / 60)}:
          {('0' + (timeElapsed() % 60)).slice(-2)}
        </div>
        <div class="flex space-x-2 md:space-x-4 mt-2 md:mt-0">
          <button
            class={`px-8 py-4 ${
              isRunning()
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white text-lg rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
            onClick={toggleTimer}
          >
            {isRunning() ? 'Pause' : 'Start'}
          </button>
          <button
            class="px-8 py-4 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out mt-2 md:mt-0"
            onClick={handleEndGame}
          >
            End Game
          </button>
        </div>
      </div>

      {/* EndGameConfirmationModal */}
      <EndGameConfirmationModal
        showEndGameConfirm={showEndGameConfirm}
        confirmEndGame={confirmEndGame}
        cancelEndGame={cancelEndGame}
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-2 text-green-600">
            Players on Field
          </h2>
          <ul>
            <For each={onFieldPlayers()}>
              {(player) => (
                <li
                  class={`flex justify-between items-center mb-2 p-4 rounded-lg cursor-pointer ${
                    selectedSubOffPlayer() &&
                    selectedSubOffPlayer().name === player.name
                      ? 'bg-blue-200'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handlePlayerClick(player)}
                >
                  <div class="font-medium text-lg">
                    {player.name}{' '}
                    {player.isGoalkeeper && (
                      <span class="text-yellow-500 font-semibold">(GK)</span>
                    )}
                  </div>
                  <div class="flex items-center">
                    <span class="mr-4 text-sm text-gray-600">
                      {formatTime(getTotalPlayTime(player))}
                    </span>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-2 text-green-600">
            Players Off Field
          </h2>
          <ul>
            <For each={offFieldPlayers()}>
              {(player) => (
                <li class="flex justify-between items-center mb-2 p-4 rounded-lg hover:bg-gray-100">
                  <div class="font-medium text-lg">{player.name}</div>
                  <div>
                    <span class="text-sm text-gray-600">
                      {formatTime(getTotalPlayTime(player))}
                    </span>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 class="text-2xl font-bold mb-2 text-green-600">Substitution</h2>
        <div class="flex flex-col md:flex-row items-start md:items-center">
          <div class="md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <label class="block font-semibold mb-2 text-gray-700 text-lg">
              Player to Sub Off:
            </label>
            <div class="p-4 border border-gray-300 rounded-lg box-border h-16 flex items-center text-lg">
              {selectedSubOffPlayer()
                ? selectedSubOffPlayer().name
                : 'Select a player'}
            </div>
          </div>
          <div class="md:w-1/2 md:pl-4">
            <label class="block font-semibold mb-2 text-gray-700 text-lg">
              Select Player to Sub On:
            </label>
            <select
              class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer box-border h-16 text-lg"
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
          class="mt-4 px-8 py-4 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={makeSubstitution}
        >
          Make Substitution
        </button>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-md mb-4">
        <button
          class="px-8 py-4 bg-yellow-500 text-white text-lg rounded-lg cursor-pointer hover:bg-yellow-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={assignGoalkeeper}
        >
          Change Goalkeeper
        </button>
      </div>

      {/* AssignGoalkeeperModal */}
      <AssignGoalkeeperModal
        showGKModal={showGKModal}
        onFieldPlayers={onFieldPlayers}
        setSelectedNewGoalkeeper={setSelectedNewGoalkeeper}
        setShowGKConfirmModal={setShowGKConfirmModal}
        setShowGKModal={setShowGKModal}
      />

      {/* ConfirmGoalkeeperModal */}
      <ConfirmGoalkeeperModal
        showGKConfirmModal={showGKConfirmModal}
        selectedNewGoalkeeper={selectedNewGoalkeeper}
        confirmGoalkeeper={confirmGoalkeeper}
        setShowGKConfirmModal={setShowGKConfirmModal}
      />

      <div class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-2 text-green-600">Add New Player</h2>
        <div class="flex flex-col sm:flex-row">
          <input
            type="text"
            class="sm:flex-1 p-4 border border-gray-300 sm:rounded-l-lg rounded-t-lg sm:rounded-tr-none sm:rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-green-400 box-border text-lg"
            placeholder="Player Name"
            value={newPlayerName()}
            onInput={(e) => setNewPlayerName(e.target.value)}
          />
          <button
            class="sm:px-8 px-4 py-4 bg-green-500 text-white text-lg sm:rounded-r-lg rounded-b-lg sm:rounded-bl-none cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 sm:mt-0 mt-2"
            onClick={addNewPlayer}
          >
            Add
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GameManagement;