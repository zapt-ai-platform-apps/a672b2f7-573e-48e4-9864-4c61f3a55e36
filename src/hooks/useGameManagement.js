import { createSignal } from 'solid-js';

function createGameManagementStore(props) {
  // State variables for modals
  const [showGoalModal, setShowGoalModal] = createSignal(false);
  const [showRemoveGoalConfirm, setShowRemoveGoalConfirm] = createSignal(false);
  const [showGKModal, setShowGKModal] = createSignal(false);
  const [showGKConfirmModal, setShowGKConfirmModal] = createSignal(false);
  const [selectedNewGoalkeeper, setSelectedNewGoalkeeper] = createSignal(null);
  const [showAddPlayerModal, setShowAddPlayerModal] = createSignal(false);
  const [newPlayerName, setNewPlayerName] = createSignal('');
  const [showAdjustModal, setShowAdjustModal] = createSignal(false);
  const [adjustType, setAdjustType] = createSignal(null);
  const [selectedPlayer, setSelectedPlayer] = createSignal(null);
  const [showConfirmModal, setShowConfirmModal] = createSignal(false);

  // Functions for handling actions

  // For Goal Scored
  const recordGoal = (team, scorerName) => {
    const time = props.getTimeElapsed();
    if (team === 'our') {
      props.setOurScore(props.ourScore() + 1);
      props.setGoals([...props.goals(), { team, scorerName, time }]);
    } else if (team === 'opponent') {
      props.setOpponentScore(props.opponentScore() + 1);
      props.setGoals([...props.goals(), { team, scorerName: null, time }]);
    }
  };

  // For Remove Last Goal
  const handleRemoveLastGoal = () => {
    if (props.goals().length === 0) {
      alert('No goals to remove.');
      return;
    }
    setShowRemoveGoalConfirm(true);
  };

  const confirmRemoveGoal = () => {
    const currentGoals = props.goals();
    if (currentGoals.length === 0) {
      alert('No goals to remove.');
      return;
    }
    const lastGoal = currentGoals[currentGoals.length - 1];

    if (lastGoal.team === 'our') {
      props.setOurScore(Math.max(0, props.ourScore() - 1));
    } else if (lastGoal.team === 'opponent') {
      props.setOpponentScore(Math.max(0, props.opponentScore() - 1));
    }

    props.setGoals(currentGoals.slice(0, -1));
    setShowRemoveGoalConfirm(false);
  };

  const cancelRemoveGoal = () => {
    setShowRemoveGoalConfirm(false);
  };

  // For Change Goalkeeper
  const assignGoalkeeper = () => {
    setShowGKModal(true);
  };

  const confirmGoalkeeper = (playerName) => {
    const previousGoalkeeperName = props.goalkeeper();

    props.setPlayerData(
      props.playerData().map((player) => {
        if (player.name === playerName) {
          if (props.isRunning() && player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            player.playIntervals.push({
              startTime: Date.now(),
              endTime: null,
              isGoalkeeper: true,
            });
          }
          return { ...player, isGoalkeeper: true };
        } else if (player.name === previousGoalkeeperName) {
          if (props.isRunning() && player.isOnField) {
            if (
              player.playIntervals.length > 0 &&
              player.playIntervals[player.playIntervals.length - 1].endTime === null
            ) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            player.playIntervals.push({
              startTime: Date.now(),
              endTime: null,
              isGoalkeeper: false,
            });
          }
          return { ...player, isGoalkeeper: false };
        } else {
          return player;
        }
      })
    );

    props.setGoalkeeper(playerName);
    setShowGKConfirmModal(false);
    setShowGKModal(false);

    props.updatePlayerLists();
  };

  // For Add New Player
  const addNewPlayer = () => {
    if (newPlayerName().trim() !== '') {
      const minPlayTime =
        props.playerData().length > 0
          ? Math.min(...props.playerData().map((p) => p.totalPlayTime || 0))
          : 0;

      props.setPlayerData([
        ...props.playerData(),
        {
          name: newPlayerName().trim(),
          playIntervals: [],
          isOnField: false,
          isGoalkeeper: false,
          totalPlayTime: minPlayTime,
        },
      ]);
      setNewPlayerName('');
      props.updatePlayerLists();
      setShowAddPlayerModal(false);
    }
  };

  // For Adjust Players
  const handleIncreasePlayers = () => {
    setAdjustType('increase');
    setShowAdjustModal(true);
  };

  const handleDecreasePlayers = () => {
    setAdjustType('decrease');
    setShowAdjustModal(true);
  };

  const confirmAdjustment = () => {
    if (adjustType() === 'increase' && selectedPlayer()) {
      // Add player to on-field
      props.setPlayerData(
        props.playerData().map((player) => {
          if (player.name === selectedPlayer().name) {
            if (props.isRunning()) {
              return {
                ...player,
                isOnField: true,
                playIntervals: [
                  ...player.playIntervals,
                  {
                    startTime: Date.now(),
                    endTime: null,
                    isGoalkeeper: player.isGoalkeeper,
                  },
                ],
              };
            } else {
              return {
                ...player,
                isOnField: true,
              };
            }
          }
          return player;
        })
      );
      props.updatePlayerLists();
    } else if (adjustType() === 'decrease' && selectedPlayer()) {
      // Remove player from on-field
      props.setPlayerData(
        props.playerData().map((player) => {
          if (player.name === selectedPlayer().name) {
            if (player.playIntervals.length > 0) {
              player.playIntervals[player.playIntervals.length - 1].endTime = Date.now();
            }
            return { ...player, isOnField: false };
          }
          return player;
        })
      );
      props.updatePlayerLists();
    }
    setShowConfirmModal(false);
    setSelectedPlayer(null);
  };

  // Available players for assigning goalkeeper
  const availableGoalkeepers = () =>
    props.onFieldPlayers().filter((player) => player.name !== props.goalkeeper());

  return {
    // State variables
    showGoalModal,
    setShowGoalModal,
    showRemoveGoalConfirm,
    setShowRemoveGoalConfirm,
    showGKModal,
    setShowGKModal,
    showGKConfirmModal,
    setShowGKConfirmModal,
    selectedNewGoalkeeper,
    setSelectedNewGoalkeeper,
    showAddPlayerModal,
    setShowAddPlayerModal,
    newPlayerName,
    setNewPlayerName,
    showAdjustModal,
    setShowAdjustModal,
    adjustType,
    setAdjustType,
    selectedPlayer,
    setSelectedPlayer,
    showConfirmModal,
    setShowConfirmModal,

    // Functions
    recordGoal,
    handleRemoveLastGoal,
    confirmRemoveGoal,
    cancelRemoveGoal,
    assignGoalkeeper,
    confirmGoalkeeper,
    addNewPlayer,
    handleIncreasePlayers,
    handleDecreasePlayers,
    confirmAdjustment,
    availableGoalkeepers,
  };
}

export default createGameManagementStore;