import React from 'react';
import GoalScoredModal from './modals/GoalScoredModal.jsx';
import RemoveGoalConfirmationModal from '../../components/RemoveGoalConfirmationModal.jsx';
import AssignGoalkeeperModal from './modals/AssignGoalkeeperModal.jsx';
import ConfirmGoalkeeperModal from './modals/ConfirmGoalkeeperModal.jsx';

function GoalAndGKModals(props) {
  return (
    <>
      <GoalScoredModal
        showGoalModal={props.showGoalModal}
        setShowGoalModal={props.setShowGoalModal}
        players={props.onFieldPlayers}
        recordGoal={props.recordGoal}
      />

      <RemoveGoalConfirmationModal
        showRemoveGoalConfirm={props.showRemoveGoalConfirm}
        confirmRemoveGoal={props.confirmRemoveGoal}
        cancelRemoveGoal={props.cancelRemoveGoal}
      />

      <AssignGoalkeeperModal
        showGKModal={props.showGKModal}
        availablePlayers={props.availableGoalkeepers}
        setSelectedNewGoalkeeper={props.setSelectedNewGoalkeeper}
        setShowGKConfirmModal={props.setShowGKConfirmModal}
        setShowGKModal={props.setShowGKModal}
      />

      <ConfirmGoalkeeperModal
        showGKConfirmModal={props.showGKConfirmModal}
        selectedNewGoalkeeper={props.selectedNewGoalkeeper}
        confirmGoalkeeper={props.confirmGoalkeeper}
        setShowGKConfirmModal={props.setShowGKConfirmModal}
      />
    </>
  );
}

export default GoalAndGKModals;