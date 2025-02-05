import React from 'react';
import GoalScoredModal from './modals/GoalScoredModal.jsx';
import RemoveGoalConfirmationModal from './modals/RemoveGoalConfirmationModal.jsx';
import AssignGoalkeeperModal from './modals/AssignGoalkeeperModal.jsx';
import ConfirmGoalkeeperModal from './modals/ConfirmGoalkeeperModal.jsx';

function GoalAndGKModals(props) {
  return (
    <>
      <GoalScoredModal {...props} />
      <RemoveGoalConfirmationModal {...props} />
      <AssignGoalkeeperModal {...props} />
      <ConfirmGoalkeeperModal {...props} />
    </>
  );
}

export default GoalAndGKModals;