import { removeLastGoal } from "../../../shared/models/scoreCalculations";
import * as Sentry from "@sentry/browser";
import type { Goal } from "../../../types/GameTypes";

interface GoalHandlersProps {
  props: {
    goals: Goal[];
    ourScore: number;
    opponentScore: number;
    setOurScore: (score: number) => void;
    setOpponentScore: (score: number) => void;
    setGoals: (goals: Goal[]) => void;
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
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        Sentry.captureException(error);
      } else {
        const unknownError = new Error("Unknown error in confirmRemoveGoal");
        alert(unknownError.message);
        Sentry.captureException(unknownError);
      }
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