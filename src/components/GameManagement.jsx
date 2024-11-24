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
import GoalScoredModal from './GoalScoredModal';

function GameManagement(props) {
  const {
    numOnField,
    playerData,
    setPlayerData,
    goalkeeper,
    setGoalkeeper,
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
    onEndGame,
  } = props;

  const [isRunning, setIsRunning] = createSignal(false);
  const [gameIntervals, setGameIntervals] = createSignal([]);

  const [selectedSubOffPlayer, setSelectedSubOffPlayer] = createSignal(null);
  const [selectedSubOnPlayer, setSelectedSubOnPlayer] = createSignal(null);

  const [onFieldPlayers, setOnFieldPlayers] = createSignal([]);
  const [offFieldPlayers, setOffFieldPlayers] = createSignal([]);

  const [showGKModal, setShowGKModal] = createSignal(false);
  const [showGKConfirmModal, setShowGKConfirmModal] = createSignal(false);
  const [selectedNewGoalkeeper, setSelectedNewGoalkeeper] = createSignal(null);

  const [showEndGameConfirm, setShowEndGameConfirm] = createSignal(false);

  const [newPlayerName, setNewPlayerName] = createSignal('');

  const [now, setNow] = createSignal(Date.now());
  let uiTimer = null;
  const navigate = useNavigate();

  const [showGoalModal, setShowGoalModal] = createSignal(false);

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
      () =>
        playerData()
          .filter((player) => player.isOnField)
          .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
    setOffFieldPlayers(
      () =>
        playerData()
          .filter((player) => !player.isOnField)
          .sort((a, b) => getTotalPlayTime(a) - getTotalPlayTime(b))
    );
  };

  const getTotalPlayTime = (player) => {
    now(); // Make reactive
    let total = 0;
    for (const interval of player.playIntervals) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning() ? now() - interval.startTime : 0;
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
        total += isRunning() ? now() - interval.startTime : 0;
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
    if (selectedSubOffPlayer() && selectedSubOnPlayer()) {
      const offPlayerName = selectedSubOffPlayer().name;
      const onPlayerName = selectedSubOnPlayer().name;

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
            if (isRunning()) {
              // Start a new play interval
              return {
                ...player,
                isOnField: true,
                playIntervals: [
                  ...player.playIntervals,
                  { startTime: Date.now(), endTime: null },
                ],
              };
            } else {
              // Game is paused; player is on field but no play interval started
              return {
                ...player,
                isOnField: true,
              };
            }
          }
          return player;
        })
      );
      setSelectedSubOffPlayer(null);
      setSelectedSubOnPlayer(null);
      // Update the player lists
      updatePlayerLists();
    } else {
      alert('Please select a player to sub off and a player to sub on.');
    }
  };

  const handleSubOffPlayerClick = (player) => {
    setSelectedSubOffPlayer(player);
  };

  const handleSubOnPlayerClick = (player) => {
    setSelectedSubOnPlayer(player);
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
          if (isRunning() && player.playIntervals.length > 0 && player.isOnField) {
            player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
          }
          return { ...player, isGoalkeeper: true };
        }
        if (player.name === previousGoalkeeperName) {
          // Previous goalkeeper, start a new play interval if they are on field and game is running
          if (isRunning() && player.isOnField) {
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
    setShowEndGameConfirm(false);
    // Navigate to GameSummary page
    navigate('/summary');
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

  // Function to record goal
  const recordGoal = (team, scorerName) => {
    const time = getTimeElapsed();
    if (team === 'our') {
      setOurScore(ourScore() + 1);
      setGoals([...goals(), { team, scorerName, time }]);
    } else if (team === 'opponent') {
      setOpponentScore(opponentScore() + 1);
      setGoals([...goals(), { team, scorerName: null, time }]);
    }
  };

  return (
    <div class="min-h-screen flex flex-col text-gray-800">
      <div class="p-8 flex-grow">
        <h1 class="text-4xl font-bold mb-8 text-green-600">Game Management</h1>

        <Header
          isRunning={isRunning}
          toggleTimer={toggleTimer}
          getTimeElapsed={getTimeElapsed}
          handleEndGame={handleEndGame}
          ourScore={ourScore}
          opponentScore={opponentScore}
        />

        {/* EndGameConfirmationModal */}
        <EndGameConfirmationModal
          showEndGameConfirm={showEndGameConfirm}
          confirmEndGame={confirmEndGame}
          cancelEndGame={cancelEndGame}
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PlayerList
            players={onFieldPlayers}
            title="Players on Field"
            selectedPlayer={selectedSubOffPlayer}
            handlePlayerClick={handleSubOffPlayerClick}
            getTotalPlayTime={getTotalPlayTime}
          />
          <PlayerList
            players={offFieldPlayers}
            title="Players Off Field"
            selectedPlayer={selectedSubOnPlayer}
            handlePlayerClick={handleSubOnPlayerClick}
            getTotalPlayTime={getTotalPlayTime}
          />
        </div>

        <Substitution
          selectedSubOffPlayer={selectedSubOffPlayer}
          selectedSubOnPlayer={selectedSubOnPlayer}
          makeSubstitution={makeSubstitution}
        />

        <div class="bg-white p-8 rounded-lg shadow-md mb-8">
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

        {/* GoalScored button */}
        <div class="bg-white p-8 rounded-lg shadow-md mb-8">
          <button
            class="px-8 py-4 bg-green-500 text-white text-lg rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
            onClick={() => setShowGoalModal(true)}
          >
            Goal Scored
          </button>
        </div>

        {/* GoalScoredModal */}
        <GoalScoredModal
          showGoalModal={showGoalModal}
          setShowGoalModal={setShowGoalModal}
          players={onFieldPlayers}
          recordGoal={recordGoal}
        />
      </div>
      <Footer />
    </div>
  );
}

export default GameManagement;