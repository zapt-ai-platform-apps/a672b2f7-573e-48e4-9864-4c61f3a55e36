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
  const [gameStartTime, setGameStartTime] = createSignal(null);
  const [gamePauseTime, setGamePauseTime] = createSignal(null);
  const [totalPausedTime, setTotalPausedTime] = createSignal(0);

  const [selectedOnPlayer, setSelectedOnPlayer] = createSignal('');

  const [onFieldPlayers, setOnFieldPlayers] = createSignal([]);
  const [offFieldPlayers, setOffFieldPlayers] = createSignal([]);

  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = createSignal(null);

  const [showGKModal, setShowGKModal] = createSignal(false);
  const [showGKConfirmModal, setShowGKConfirmModal] = createSignal(false);
  const [selectedNewGoalkeeper, setSelectedNewGoalkeeper] = createSignal(null);

  const [showEndGameConfirm, setShowEndGameConfirm] = createSignal(false);

  const [newPlayerName, setNewPlayerName] = createSignal('');

  const navigate = useNavigate();

  onMount(() => {
    initializeOnFieldIntervals();
    updatePlayerLists();
    // Set default player to sub on
    setDefaultSubOnPlayer();
  });

  const initializeOnFieldIntervals = () => {
    setPlayerData(
      playerData().map((player) => {
        if (player.isOnField && !player.isGoalkeeper) {
          return {
            ...player,
            onFieldIntervals: [{ start: Date.now(), end: null }],
          };
        } else {
          return { ...player, onFieldIntervals: [] };
        }
      })
    );
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = ('0' + (timeInSeconds % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  const calculatePlayerPlayTime = (player) => {
    const intervals = player.onFieldIntervals || [];
    return intervals.reduce((total, interval) => {
      const start = interval.start;
      const end = interval.end || (isRunning() ? Date.now() : gamePauseTime() || Date.now());
      return total + (end - start);
    }, 0) / 1000; // Convert milliseconds to seconds
  };

  const updatePlayerLists = () => {
    setOnFieldPlayers(
      playerData()
        .filter((player) => player.isOnField)
        .sort((a, b) => calculatePlayerPlayTime(a) - calculatePlayerPlayTime(b))
    );
    setOffFieldPlayers(
      playerData()
        .filter((player) => !player.isOnField)
        .sort((a, b) => calculatePlayerPlayTime(a) - calculatePlayerPlayTime(b))
    );
  };

  createEffect(() => {
    updatePlayerLists();
  });

  const makeSubstitution = () => {
    if (selectedSubOffPlayer() && selectedOnPlayer()) {
      const offPlayerName = selectedSubOffPlayer().name;
      const onPlayerName = selectedOnPlayer();

      setPlayerData(
        playerData().map((player) => {
          if (player.name === offPlayerName) {
            // End the current interval
            if (player.onFieldIntervals && player.onFieldIntervals.length > 0) {
              const intervals = player.onFieldIntervals.map((interval) => {
                if (interval.end === null) {
                  return { ...interval, end: Date.now() };
                }
                return interval;
              });
              return {
                ...player,
                isOnField: false,
                onFieldIntervals: intervals,
              };
            }
            return { ...player, isOnField: false };
          }
          if (player.name === onPlayerName) {
            // Start a new interval
            const intervals = player.onFieldIntervals || [];
            return {
              ...player,
              isOnField: true,
              onFieldIntervals: [...intervals, { start: Date.now(), end: null }],
            };
          }
          return player;
        })
      );
      setSelectedSubOffPlayer(null);
      setSelectedOnPlayer('');
      setDefaultSubOnPlayer();
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

    setPlayerData(
      playerData().map((player) => {
        if (player.name === previousGoalkeeperName) {
          // Previous goalkeeper becomes an outfield player
          const minPlayTime = getMinimumPlayTimeExcludingGoalkeeper();
          return {
            ...player,
            isGoalkeeper: false,
            onFieldIntervals: [
              ...(player.onFieldIntervals || []),
              { start: Date.now(), end: null },
            ],
          };
        }
        if (player.name === playerName) {
          // New goalkeeper
          // End any current interval
          const intervals = (player.onFieldIntervals || []).map((interval) => {
            if (interval.end === null) {
              return { ...interval, end: Date.now() };
            }
            return interval;
          });
          return {
            ...player,
            isGoalkeeper: true,
            onFieldIntervals: intervals,
          };
        }
        return player;
      })
    );
    setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);
    updatePlayerLists();
  };

  const getMinimumPlayTimeExcludingGoalkeeper = () => {
    const nonGKPlayers = playerData().filter(
      (p) => !p.isGoalkeeper && p.isOnField
    );
    if (nonGKPlayers.length === 0) return 0;
    return Math.min(
      ...nonGKPlayers.map((p) => calculatePlayerPlayTime(p))
    );
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
    if (!isRunning()) {
      // Start the game or resume
      setIsRunning(true);
      if (!gameStartTime()) {
        setGameStartTime(Date.now());
      }
      if (gamePauseTime()) {
        // If resuming from pause, accumulate paused time
        setTotalPausedTime(
          totalPausedTime() + (Date.now() - gamePauseTime())
        );
        setGamePauseTime(null);
      }

      // For players who are on the field and not goalkeeper, adjust their intervals
      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField && !player.isGoalkeeper) {
            const intervals = player.onFieldIntervals || [];
            // If their last interval ended when the game was paused, start a new interval
            if (
              intervals.length === 0 ||
              intervals[intervals.length - 1].end !== null
            ) {
              return {
                ...player,
                onFieldIntervals: [
                  ...intervals,
                  { start: Date.now(), end: null },
                ],
              };
            }
          }
          return player;
        })
      );
    } else {
      // Pause the game
      setIsRunning(false);
      setGamePauseTime(Date.now());

      // For players who are on the field and not goalkeeper, end their current intervals
      setPlayerData(
        playerData().map((player) => {
          if (player.isOnField && !player.isGoalkeeper) {
            const intervals = player.onFieldIntervals || [];
            if (intervals.length > 0 && intervals[intervals.length - 1].end === null) {
              return {
                ...player,
                onFieldIntervals: intervals.map((interval, index) => {
                  if (index === intervals.length - 1) {
                    return { ...interval, end: Date.now() };
                  }
                  return interval;
                }),
              };
            }
          }
          return player;
        })
      );
    }
    updatePlayerLists();
  };

  const addNewPlayer = () => {
    if (newPlayerName().trim() !== '') {
      const minPlayTime = getMinimumPlayTimeExcludingGoalkeeper();
      setPlayerData([
        ...playerData(),
        {
          name: newPlayerName().trim(),
          onFieldIntervals: [],
          isOnField: false,
          isGoalkeeper: false,
        },
      ]);
      setNewPlayerName('');
      updatePlayerLists();
      setDefaultSubOnPlayer();
    }
  };

  const setDefaultSubOnPlayer = () => {
    if (offFieldPlayers().length > 0) {
      const defaultSubOnPlayer = offFieldPlayers().reduce(
        (prev, current) =>
          calculatePlayerPlayTime(current) < calculatePlayerPlayTime(prev) ? current : prev,
        offFieldPlayers()[0]
      );
      setSelectedOnPlayer(defaultSubOnPlayer.name);
    } else {
      setSelectedOnPlayer('');
    }
  };

  return (
    <div class="min-h-screen p-4 flex flex-col text-gray-800">
      <h1 class="text-3xl font-bold mb-4 text-green-600">Game Management</h1>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <span class="font-semibold">Time Elapsed: </span>
          {formatTime(
            Math.floor(
              ((isRunning() ? Date.now() : gamePauseTime() || Date.now()) -
                (gameStartTime() || Date.now()) -
                totalPausedTime()) /
                1000
            )
          )}
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
                      {formatTime(Math.floor(calculatePlayerPlayTime(player)))}
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
                      {formatTime(Math.floor(calculatePlayerPlayTime(player)))}
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