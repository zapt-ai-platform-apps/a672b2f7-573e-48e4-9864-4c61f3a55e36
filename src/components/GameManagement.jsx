import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import { For, Show } from 'solid-js/web';
import Analytics from './Analytics';

function GameManagement(props) {
  const [timeElapsed, setTimeElapsed] = createSignal(0);
  const [isRunning, setIsRunning] = createSignal(false);
  const [timer, setTimer] = createSignal(null);
  const [goalkeeper, setGoalkeeper] = createSignal(null);
  const [showGoalkeeperModal, setShowGoalkeeperModal] = createSignal(false);
  const [showAnalytics, setShowAnalytics] = createSignal(false);

  const maxStarPlayersOff = 2;

  // Calculate next substitutions
  const getNextSubstitutions = () => {
    // Players not on field and not goalkeeper
    const offFieldPlayers = props.playerData().filter(
      (player) => !player.isOnField && !player.isGoalkeeper
    );
    // Players on field and not goalkeeper
    const onFieldPlayers = props.playerData().filter(
      (player) => player.isOnField && !player.isGoalkeeper
    );

    // Sort by total playtime
    offFieldPlayers.sort((a, b) => a.totalPlayTime - b.totalPlayTime);
    onFieldPlayers.sort((a, b) => b.totalPlayTime - a.totalPlayTime);

    // Ensure that no more than maxStarPlayersOff star players are off the field
    const starPlayersOffField = props.playerData().filter(
      (player) => !player.isOnField && player.isStarPlayer && !player.isGoalkeeper
    ).length;

    let nextPlayerIn = null;
    let nextPlayerOut = null;

    for (let i = 0; i < offFieldPlayers.length; i++) {
      const potentialIn = offFieldPlayers[i];
      let potentialStarPlayersOff = starPlayersOffField;
      if (potentialIn.isStarPlayer) {
        potentialStarPlayersOff -= 1;
      }

      for (let j = 0; j < onFieldPlayers.length; j++) {
        const potentialOut = onFieldPlayers[j];
        if (potentialOut.name === goalkeeper()) continue;
        if (potentialOut.isStarPlayer) {
          potentialStarPlayersOff += 1;
        }

        if (potentialStarPlayersOff <= maxStarPlayersOff) {
          nextPlayerIn = potentialIn;
          nextPlayerOut = potentialOut;
          break;
        }

        if (potentialOut.isStarPlayer) {
          potentialStarPlayersOff -= 1;
        }
      }

      if (nextPlayerIn && nextPlayerOut) {
        break;
      }
    }

    return { nextPlayerIn, nextPlayerOut };
  };

  const { nextPlayerIn, nextPlayerOut } = getNextSubstitutions();

  // Timer functions
  const startTimer = () => {
    if (!isRunning()) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      setTimer(interval);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    if (isRunning()) {
      clearInterval(timer());
      setIsRunning(false);
    }
  };

  onCleanup(() => {
    if (timer()) {
      clearInterval(timer());
    }
  });

  // Update playtime for players on field every second
  createEffect(() => {
    if (isRunning()) {
      const interval = setInterval(() => {
        props.setPlayerData(
          props.playerData().map((player) => {
            if (player.isOnField && !player.isGoalkeeper) {
              return { ...player, totalPlayTime: player.totalPlayTime + 1 };
            }
            return player;
          })
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const assignGoalkeeper = (name) => {
    // Reset previous goalkeeper
    props.setPlayerData(
      props.playerData().map((player) => ({
        ...player,
        isGoalkeeper: player.name === name,
      }))
    );
    setGoalkeeper(name);
    setShowGoalkeeperModal(false);
  };

  const substitutePlayers = () => {
    if (nextPlayerIn && nextPlayerOut) {
      props.setPlayerData(
        props.playerData().map((player) => {
          if (player.name === nextPlayerIn.name) {
            return { ...player, isOnField: true };
          }
          if (player.name === nextPlayerOut.name) {
            return { ...player, isOnField: false };
          }
          return player;
        })
      );
    } else {
      alert('No valid substitutions available while respecting star player constraints.');
    }
  };

  return (
    <div class="h-full">
      <Show
        when={!showAnalytics()}
        fallback={<Analytics playerData={props.playerData()} onClose={() => setShowAnalytics(false)} />}
      >
        <h1 class="text-3xl font-bold mb-4 text-green-600">Game Management</h1>
        <div class="flex flex-col md:flex-row md:space-x-8">
          <div class="md:w-1/2">
            <div class="bg-white p-4 rounded-lg shadow-lg mb-4">
              <h2 class="text-xl font-bold mb-2 text-green-600">Game Clock</h2>
              <p class="text-4xl font-mono mb-4">{Math.floor(timeElapsed() / 60)}:{('0' + (timeElapsed() % 60)).slice(-2)}</p>
              <div class="flex space-x-4">
                <button
                  class="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={startTimer}
                  disabled={isRunning()}
                >
                  Start
                </button>
                <button
                  class="px-4 py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={pauseTimer}
                  disabled={!isRunning()}
                >
                  Pause
                </button>
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={props.onEndGame}
                >
                  End Game
                </button>
              </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg">
              <h2 class="text-xl font-bold mb-2 text-green-600">Next Substitutions</h2>
              <Show
                when={nextPlayerIn && nextPlayerOut}
                fallback={<p>No valid substitutions available.</p>}
              >
                <p>
                  <span class="font-bold">{nextPlayerOut.name}</span> will come off for{' '}
                  <span class="font-bold">{nextPlayerIn.name}</span>
                </p>
                <button
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={substitutePlayers}
                >
                  Substitute
                </button>
              </Show>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-lg mt-4">
              <button
                class="w-full px-4 py-2 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setShowAnalytics(true)}
              >
                View Analytics
              </button>
            </div>
          </div>
          <div class="md:w-1/2 mt-4 md:mt-0">
            <div class="bg-white p-4 rounded-lg shadow-lg">
              <h2 class="text-xl font-bold mb-2 text-green-600">Players</h2>
              <div class="overflow-y-auto max-h-96 pr-2">
                <For each={props.playerData()}>
                  {(player) => (
                    <div
                      class={`flex items-center justify-between mb-2 p-2 rounded ${
                        player.isOnField ? 'bg-green-100' : 'bg-red-100'
                      } ${player.name === nextPlayerIn?.name ? 'border-2 border-blue-500' : ''}`}
                    >
                      <div>
                        <p class="font-semibold">
                          {player.name}{' '}
                          {player.isStarPlayer && <span class="text-yellow-500">⭐</span>}
                          {player.isGoalkeeper && <span class="text-blue-500 ml-1">(GK)</span>}
                        </p>
                        <p class="text-sm">
                          Play Time: {Math.floor(player.totalPlayTime / 60)}:
                          {('0' + (player.totalPlayTime % 60)).slice(-2)}
                        </p>
                      </div>
                      <button
                        class="text-sm text-blue-500 cursor-pointer hover:text-blue-600"
                        onClick={() => setShowGoalkeeperModal(true)}
                      >
                        {player.isGoalkeeper ? 'Change GK' : 'Assign GK'}
                      </button>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
        <Show when={showGoalkeeperModal()}>
          <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg">
              <h2 class="text-xl font-bold mb-4 text-green-600">Select Goalkeeper</h2>
              <div class="overflow-y-auto max-h-64 pr-2">
                <For each={props.playerData()}>
                  {(player) => (
                    <div
                      class="flex items-center justify-between mb-2 p-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => assignGoalkeeper(player.name)}
                    >
                      <p>
                        {player.name} {player.isStarPlayer && <span class="text-yellow-500">⭐</span>}
                      </p>
                    </div>
                  )}
                </For>
              </div>
              <button
                class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setShowGoalkeeperModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Show>
      </Show>
    </div>
  );
}

export default GameManagement;