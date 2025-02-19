import { removeLastGoal } from '../../../shared/models/scoreModel';

export function createGameGoalHandlers({ props, setShowRemoveGoalConfirm }) {
  const handleRemoveLastGoal = () => {
    if (props.goals.length === 0) {
      alert('No goals to remove.');
      return;
    }
    setShowRemoveGoalConfirm(true);
  };

  const confirmRemoveGoal = () => {
    try {
      const { newOurScore, newOpponentScore, newGoals } = removeLastGoal(props.goals, props.ourScore, props.opponentScore);
      props.setOurScore(newOurScore);
      props.setOpponentScore(newOpponentScore);
      props.setGoals(newGoals);
      setShowRemoveGoalConfirm(false);
    } catch (error) {
      alert(error.message);
    }
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