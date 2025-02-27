import { Goal } from "../../../types/GameTypes";
import * as Sentry from "@sentry/browser";

// Fix: Updated goal interface to match actual usage
interface GoalWithTeam extends Goal {
  team: 'our' | 'opponent';
}

// Create replacement for removeLastGoal function since the import path is problematic
function removeLastGoal(
  goals: GoalWithTeam[], 
  ourScore: number, 
  opponentScore: number
) {
  if (goals.length === 0) {
    throw new Error("No goals to remove");
  }
  
  const lastGoal = goals[goals.length - 1];
  const newGoals = [...goals.slice(0, -1)];
  
  let newOurScore = ourScore;
  let newOpponentScore = opponentScore;
  
  if (lastGoal.team === 'opponent') {
    newOpponentScore = Math.max(0, opponentScore - 1);
  } else {
    newOurScore = Math.max(0, ourScore - 1);
  }
  
  return {
    newOurScore,
    newOpponentScore,
    newGoals
  };
}

interface GoalHandlersProps {
  props: {
    goals: GoalWithTeam[];
    ourScore: number;
    opponentScore: number;
    setOurScore: (score: number) => void;
    setOpponentScore: (score: number) => void;
    setGoals: (goals: GoalWithTeam[]) => void;
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