import {
  createSignal,
  onCleanup,
  createEffect,
  onMount,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Footer from './Footer';
import EndGameConfirmationModal from './EndGameConfirmationModal';
import AssignGoalkeeperModal from './AssignGoalkeeperModal';
import ConfirmGoalkeeperModal from './ConfirmGoalkeeperModal';
import Header from './Header';
import PlayerList from './PlayerList';
import Substitution from './Substitution';
import AddPlayer from './AddPlayer';

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
  const [gameIntervals, setGameIntervals] = createSignal([]);

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

  const [now, setNow] = createSignal(Date.now());

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
      () => playerData()
        .filter((player) => player.isOnField)
        .sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a))
    );
    setOffFieldPlayers(
      () => playerData()
        .filter((player) => !player.isOnField)
        .sort((a, b) => getTotalPlayTime(b) - getTotalPlayTime(a))
    );
  };

  const getTotalPlayTime = (player) => {
    now(); // Make reactive
    let total = 0;
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += now() - interval.startTime;
      }
    }
    return Math.floor(total / 1000); // return total playtime in seconds
  };

  const getTimeElapsed = () => {
    now(); // Make reactive
    let total = 0;
    for (const interval of gameIntervals()) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += now() - interval.startTime;
      }
    }
    return Math.floor(total / 1000); // return total time in seconds
  };

  // UI Timer to update the interface every second
  const startUITimer = () => {
    uiTimer = setInterval(() => {
      setNow(Date.now());
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
    if (isRunning()) {
      // End the current game interval
      setIsRunning(false);
      setGameIntervals((prev) =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && interval.endTime === null
            ? { ...interval, endTime: Date.now() }
            : interval
        )
      );
    }
    setShowEndGameConfirm(false);
    onEndGame();
    navigate('/');
  };

  const cancelEndGame = () => {
    setShowEndGameConfirm(false);
  };

  const toggleTimer = () => {
    if (!isRunning()) {
      // Game is starting or resuming
      setIsRunning(true);
      // Start a new game interval
      setGameIntervals((prev) => [...prev, { startTime: Date.now(), endTime: null }]);

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
      setIsRunning(false);
      // End the current game interval
      setGameIntervals((prev) =>
        prev.map((interval, idx) =>
          idx === prev.length - 1 && interval.endTime === null
            ? { ...interval, endTime: Date.now() }
            : interval
        )
      );

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

      <Header
        isRunning={isRunning}
        toggleTimer={toggleTimer}
        getTimeElapsed={getTimeElapsed}
        handleEndGame={handleEndGame}
      />

      {/* EndGameConfirmationModal */}
      <EndGameConfirmationModal
        showEndGameConfirm={showEndGameConfirm}
        confirmEndGame={confirmEndGame}
        cancelEndGame={cancelEndGame}
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <PlayerList
          players={onFieldPlayers}
          title="Players on Field"
          selectedSubOffPlayer={selectedSubOffPlayer}
          handlePlayerClick={handlePlayerClick}
          getTotalPlayTime={getTotalPlayTime}
          isOnField={true}
        />
        <PlayerList
          players={offFieldPlayers}
          title="Players Off Field"
          selectedSubOffPlayer={selectedSubOffPlayer}
          handlePlayerClick={handlePlayerClick}
          getTotalPlayTime={getTotalPlayTime}
          isOnField={false}
        />
      </div>

      <Substitution
        selectedSubOffPlayer={selectedSubOffPlayer}
        offFieldPlayers={offFieldPlayers}
        selectedOnPlayer={selectedOnPlayer}
        setSelectedOnPlayer={setSelectedOnPlayer}
        makeSubstitution={makeSubstitution}
      />

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

      <AddPlayer
        newPlayerName={newPlayerName}
        setNewPlayerName={setNewPlayerName}
        addNewPlayer={addNewPlayer}
      />

      <Footer />
    </div>
  );
}

export default GameManagement;