import GoalScoredModal from './GoalScoredModal';
import AssignGoalkeeperModal from './AssignGoalkeeperModal';
import ConfirmGoalkeeperModal from './ConfirmGoalkeeperModal';
import AddPlayerModal from './AddPlayerModal';
import AdjustPlayersModal from './AdjustPlayersModal';
import ConfirmAdjustPlayersModal from './ConfirmAdjustPlayersModal';
import RemoveGoalConfirmationModal from './RemoveGoalConfirmationModal';

function GameManagementModals(props) {
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

export default GameManagementModals;