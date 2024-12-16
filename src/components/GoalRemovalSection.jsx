import { createSignal } from 'solid-js';
import RemoveGoalConfirmationModal from './RemoveGoalConfirmationModal';

function GoalRemovalSection(props) {
  const {
    ourScore,
    setOurScore,
    opponentScore,
    setOpponentScore,
    goals,
    setGoals,
  } = props;

  const [showRemoveGoalConfirm, setShowRemoveGoalConfirm] = createSignal(false);

  const handleRemoveLastGoal = () => {
    if (goals().length === 0) {
      alert('No goals to remove.');
      return;
    }
    setShowRemoveGoalConfirm(true);
  };

  const confirmRemoveGoal = () => {
    const currentGoals = goals();
    if (currentGoals.length === 0) {
      alert('No goals to remove.');
      return;
    }
    const lastGoal = currentGoals[currentGoals.length - 1];

    if (lastGoal.team === 'our') {
      setOurScore(Math.max(0, ourScore() - 1));
    } else if (lastGoal.team === 'opponent') {
      setOpponentScore(Math.max(0, opponentScore() - 1));
    }

    setGoals(currentGoals.slice(0, -1));
    setShowRemoveGoalConfirm(false);
  };

  const cancelRemoveGoal = () => {
    setShowRemoveGoalConfirm(false);
  };

  return (
    <>
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
        <button
          class="px-8 py-4 bg-red-500 text-white text-lg rounded-lg cursor-pointer hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleRemoveLastGoal}
        >
          Remove Last Goal
        </button>
      </div>

      <RemoveGoalConfirmationModal
        showRemoveGoalConfirm={showRemoveGoalConfirm}
        confirmRemoveGoal={confirmRemoveGoal}
        cancelRemoveGoal={cancelRemoveGoal}
      />
    </>
  );
}

export default GoalRemovalSection;