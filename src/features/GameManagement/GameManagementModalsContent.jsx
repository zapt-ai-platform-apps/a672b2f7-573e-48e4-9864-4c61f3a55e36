import React from 'react';
import GoalScoredModal from '../../src/components/GoalScoredModal';
import AssignGoalkeeperModal from '../../src/components/AssignGoalkeeperModal';
import ConfirmGoalkeeperModal from '../../src/components/ConfirmGoalkeeperModal';
import AddPlayerModal from '../../src/components/AddPlayerModal';
import AdjustPlayersModal from '../../src/components/AdjustPlayersModal';
import ConfirmAdjustPlayersModal from '../../src/components/ConfirmAdjustPlayersModal';
import RemoveGoalConfirmationModal from '../../src/components/RemoveGoalConfirmationModal';

function GameManagementModalsContent(props) {
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

      <AddPlayerModal
        showAddPlayerModal={props.showAddPlayerModal}
        setShowAddPlayerModal={props.setShowAddPlayerModal}
        newPlayerName={props.newPlayerName}
        setNewPlayerName={props.setNewPlayerName}
        addNewPlayer={props.addNewPlayer}
      />

      <AdjustPlayersModal
        showAdjustModal={props.showAdjustModal}
        setShowAdjustModal={props.setShowAdjustModal}
        adjustType={props.adjustType}
        onFieldPlayers={props.onFieldPlayers}
        offFieldPlayers={props.offFieldPlayers}
        setSelectedPlayer={props.setSelectedPlayer}
        setShowConfirmModal={props.setShowConfirmModal}
      />

      <ConfirmAdjustPlayersModal
        showConfirmModal={props.showConfirmModal}
        setShowConfirmModal={props.setShowConfirmModal}
        selectedPlayer={props.selectedPlayer}
        adjustType={props.adjustType}
        confirmAdjustment={props.confirmAdjustment}
      />
    </>
  );
}

export default GameManagementModalsContent;