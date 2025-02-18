/**
 * Creates handlers for managing game goals.
 *
 * @param {Object} params - Parameters object.
 * @param {Object} params.props - Props containing game state and handler functions.
 * @param {Function} params.setShowRemoveGoalConfirm - Function to toggle remove goal confirmation modal.
 * @returns {Object} Handlers for recording and removing goals.
 */
export function createGameGoalHandlers({ props, setShowRemoveGoalConfirm }) {
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
    handleRemoveLastGoal,
    confirmRemoveGoal,
    cancelRemoveGoal
  };
}