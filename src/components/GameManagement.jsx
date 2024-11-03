import { createSignal, onCleanup, createEffect, createMemo } from 'solid-js';
import { For, Show } from 'solid-js/web';
import PlayerList from './PlayerList';
import Analytics from './Analytics';

function GameManagement(props) {
  const [currentTime, setCurrentTime] = createSignal(0);
  const [timerRunning, setTimerRunning] = createSignal(false);
  const [intervalId, setIntervalId] = createSignal(null);
  const [onFieldPlayers, setOnFieldPlayers] = createSignal(
    props.playerData().filter(player => player.isOnField).map(player => player.name)
  );
  const [substitutionQueue, setSubstitutionQueue] = createSignal(
    props.playerData().filter(player => !player.isOnField).map(player => player.name)
  );
  const [showAnalytics, setShowAnalytics] = createSignal(false);
  const [goalkeeper, setGoalkeeper] = createSignal(null);
  const [showGoalkeeperModal, setShowGoalkeeperModal] = createSignal(false);

  const startTimer = () => {
    setTimerRunning(true);
    const id = setInterval(() => {
      setCurrentTime(currentTime() + 1);
      // Update playtime for players on field except goalkeeper
      const updatedData = props.playerData().map((player) => {
        if (player.isOnField && player.name !== goalkeeper()) {
          return { ...player, totalPlayTime: player.totalPlayTime + 1 };
        }
        return player;
      });
      props.setPlayerData(updatedData);
    }, 1000); // Update every second
    setIntervalId(id);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    clearInterval(intervalId());
  };

  onCleanup(() => {
    if (intervalId()) {
      clearInterval(intervalId());
    }
  });

  // Compute substitution candidates, excluding goalkeeper and ensuring max two star players off-field
  const nextPlayerOut = createMemo(() => {
    // Get star players off-field count
    const starPlayersOffField = props.playerData().filter(
      (player) => !player.isOnField && player.isStarPlayer
    ).length;

    // Filter on-field players who can be subbed off
    const candidates = props.playerData().filter(
      (player) =>
        player.isOnField &&
        player.name !== goalkeeper() &&
        // If more than two star players are off, cannot sub off another star player
        (!player.isStarPlayer || starPlayersOffField < 2)
    );

    // Select the player with the highest playtime
    return candidates.sort((a, b) => b.totalPlayTime - a.totalPlayTime)[0]?.name;
  });

  const nextPlayerIn = createMemo(() => {
    // Filter off-field players who can be subbed in
    const candidates = props.playerData().filter(
      (player) => 
        !player.isOnField &&
        // If less than two star players off, prioritize star players
        (player.isStarPlayer || 
          props.playerData().filter(p => !p.isOnField && p.isStarPlayer).length >= 2)
    );

    // Select the player with the lowest playtime
    return candidates.sort((a, b) => a.totalPlayTime - b.totalPlayTime)[0]?.name;
  });

  const makeSubstitution = () => {
    if (!nextPlayerIn() || !nextPlayerOut()) {
      alert('No valid substitutions available respecting star player constraints.');
      return;
    }
    const playerOut = nextPlayerOut();
    const playerIn = nextPlayerIn();

    // Update playerData
    const updatedData = props.playerData().map((player) => {
      if (player.name === playerOut) {
        return { ...player, isOnField: false };
      } else if (player.name === playerIn) {
        return { ...player, isOnField: true };
      }
      return player;
    });
    props.setPlayerData(updatedData);

    // Update onFieldPlayers and substitutionQueue
    setOnFieldPlayers([...onFieldPlayers().filter(name => name !== playerOut), playerIn]);
    setSubstitutionQueue([...substitutionQueue().filter(name => name !== playerIn), playerOut]);
  };

  const openGoalkeeperModal = () => {
    setShowGoalkeeperModal(true);
  };

  const assignGoalkeeper = (name) => {
    setGoalkeeper(name);
    setShowGoalkeeperModal(false);
  };

  // Update isGoalkeeper flag in playerData whenever goalkeeper changes
  createEffect(() => {
    const updatedData = props.playerData().map((player) => {
      if (player.name === goalkeeper()) {
        return { ...player, isGoalkeeper: true };
      } else {
        return { ...player, isGoalkeeper: false };
      }
    });
    props.setPlayerData(updatedData);
  });

  return (
    <div class="h-full flex flex-col">
      <h1 class="text-3xl font-bold mb-4 text-green-600">Football Subs</h1>
      <div class="flex flex-col md:flex-row flex-grow">
        <div class="bg-white p-4 rounded-lg shadow-lg w-full md:w-1/2 mb-4 md:mb-0">
          <h2 class="text-2xl font-bold mb-2 text-green-600">
            Game Time: {Math.floor(currentTime() / 60)}:
            {currentTime() % 60 < 10 ? '0' : ''}
            {currentTime() % 60}
          </h2>
          <div class="flex flex-wrap space-x-4 mb-4">
            <button
              class={`px-4 py-2 mb-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ${
                timerRunning() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={startTimer}
              disabled={timerRunning()}
            >
              Start
            </button>
            <button
              class={`px-4 py-2 mb-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 ${
                !timerRunning() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={pauseTimer}
              disabled={!timerRunning()}
            >
              Pause
            </button>
            <button
              class="px-4 py-2 mb-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={makeSubstitution}
            >
              Substitute
            </button>
            <button
              class="px-4 py-2 mb-2 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={openGoalkeeperModal}
            >
              Assign Goalkeeper
            </button>
            <button
              class="px-4 py-2 mb-2 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setShowAnalytics(true)}
            >
              View Analytics
            </button>
            <button
              class="px-4 py-2 mb-2 bg-gray-500 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={props.onEndGame}
            >
              End Game
            </button>
          </div>

          {/* Display Next Substitutions */}
          <div class="mb-4">
            <h3 class="text-xl font-bold mb-2 text-green-600">Next Substitutions</h3>
            <p class="mb-2">
              <span class="font-semibold">Next Player to Sub Off:</span>{' '}
              <Show when={nextPlayerOut()} fallback={<span>None</span>}>
                <span>{nextPlayerOut()}</span>
              </Show>
            </p>
            <p>
              <span class="font-semibold">Next Player to Sub On:</span>{' '}
              <Show when={nextPlayerIn()} fallback={<span>None</span>}>
                <span>{nextPlayerIn()}</span>
              </Show>
            </p>
          </div>

          <Show when={goalkeeper()}>
            <h3 class="text-xl font-bold mb-2 text-green-600">Goalkeeper: {goalkeeper()}</h3>
          </Show>
          <h3 class="text-xl font-bold mb-2 text-green-600">Players on Field</h3>
          <ul>
            <For each={onFieldPlayers()}>
              {(playerName) => (
                <li
                  class={`mb-1 ${
                    playerName === nextPlayerOut() && playerName !== goalkeeper()
                      ? 'font-bold text-red-500'
                      : ''
                  }`}
                >
                  {playerName}
                  {props.playerData().find(p => p.name === playerName)?.isStarPlayer ? ' ⭐' : ''}
                  {playerName === goalkeeper() ? ' (GK)' : ''}
                  {playerName === nextPlayerOut() && playerName !== goalkeeper()
                    ? ' (Next to Sub Off)'
                    : ''}
                </li>
              )}
            </For>
          </ul>
          <h3 class="text-xl font-bold mb-2 text-green-600 mt-4">Substitution Queue</h3>
          <ul>
            <For each={substitutionQueue()}>
              {(playerName) => (
                <li
                  class={`mb-1 ${
                    playerName === nextPlayerIn() ? 'font-bold text-blue-500' : ''
                  }`}
                >
                  {playerName}
                  {props.playerData().find(p => p.name === playerName)?.isStarPlayer ? ' ⭐' : ''}
                  {playerName === nextPlayerIn() ? ' (Next to Sub On)' : ''}
                </li>
              )}
            </For>
          </ul>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 class="text-2xl font-bold mb-2 text-green-600">Player Data</h2>
          <PlayerList playerData={props.playerData} goalkeeper={goalkeeper} />
        </div>
      </div>
      <Analytics
        show={showAnalytics()}
        onClose={() => setShowAnalytics(false)}
        playerData={props.playerData}
        matchLength={props.matchLength}
      />
      {/* Goalkeeper Selection Modal */}
      <Show when={showGoalkeeperModal()}>
        <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-full overflow-auto">
            <h2 class="text-2xl font-bold mb-4 text-green-600">Assign Goalkeeper</h2>
            <ul>
              <For each={props.playerData().map(player => player.name)}>
                {(name) => (
                  <li class="mb-2">
                    <button
                      class="w-full px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() => assignGoalkeeper(name)}
                    >
                      {name}
                      {props.playerData().find(p => p.name === name)?.isStarPlayer ? ' ⭐' : ''}
                    </button>
                  </li>
                )}
              </For>
            </ul>
            <button
              class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setShowGoalkeeperModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default GameManagement;