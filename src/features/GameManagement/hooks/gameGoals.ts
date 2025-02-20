import { removeLastGoal } from "../../../shared/models/scoreModel";

interface GoalHandlersProps {
  props: {
    goals: any[];
    ourScore: number;
    opponentScore: number;
    setOurScore: (score: number) => void;
    setOpponentScore: (score: number) => void;
    setGoals: (goals: any[]) => void;
  };
  setShowRemoveGoalConfirm: (value: boolean) => void;
}

export function createGameGoalHandlers({ props, setShowRemoveGoalConfirm }: GoalHandlersProps) {
  const handleRemoveLastGoal = () => {
    if (props.goals.length === 0) {
      alert("No goals to remove.");
      return;
    }
    setShowRemoveGoalConfirm(true);
  };

  const confirmRemoveGoal = () => {
    try {
      const { newOurScore, newOpponentScore, newGoals } = removeLastGoal(
        props.goals,
        props.ourScore,
        props.opponentScore
      );
      props.setOurScore(newOurScore);
      props.setOpponentScore(newOpponentScore);
      props.setGoals(newGoals);
      setShowRemoveGoalConfirm(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const cancelRemoveGoal = () => {
    setShowRemoveGoalConfirm(false);
  };

  return {
    handleRemoveLastGoal,
    confirmRemoveGoal,
    cancelRemoveGoal,
  };
}