export function createGameGoalHandlers({ props, setShowRemoveGoalConfirm }) {
  const recordGoal = (team, scorerName) => {
    const time = props.getTimeElapsed();
    if (team === 'our') {
      props.setOurScore(props.ourScore + 1);
      props.setGoals([...props.goals, { team, scorerName, time }]);
    } else if (team === 'opponent') {
      props.setOpponentScore(props.opponentScore + 1);
      props.setGoals([...props.goals, { team, scorerName: null, time }]);
    }
  };

  const handleRemoveLastGoal = () => {
    if (props.goals.length === 0) {
      alert('No goals to remove.');
      return;
    }
    setShowRemoveGoalConfirm(true);
  };

  const confirmRemoveGoal = () => {
    const currentGoals = props.goals;
    if (currentGoals.length === 0) {
      alert('No goals to remove.');
      return;
    }
    const lastGoal = currentGoals[currentGoals.length - 1];
    if (lastGoal.team === 'our') {
      props.setOurScore(Math.max(0, props.ourScore - 1));
    } else if (lastGoal.team === 'opponent') {
      props.setOpponentScore(Math.max(0, props.opponentScore - 1));
    }
    props.setGoals(currentGoals.slice(0, -1));
    setShowRemoveGoalConfirm(false);
  };

  const cancelRemoveGoal = () => {
    setShowRemoveGoalConfirm(false);
  };

  return {
    recordGoal,
    handleRemoveLastGoal,
    confirmRemoveGoal,
    cancelRemoveGoal
  };
}