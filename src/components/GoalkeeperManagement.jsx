import useGoalkeeperManagement from './useGoalkeeperManagement';
import AssignGoalkeeperModal from './AssignGoalkeeperModal';
import ConfirmGoalkeeperModal from './ConfirmGoalkeeperModal';
import ChangeGoalkeeperButton from './ChangeGoalkeeperButton';

function GoalkeeperManagement(props) {
  const {
    showGKModal,
    setShowGKModal,
    showGKConfirmModal,
    setShowGKConfirmModal,
    selectedNewGoalkeeper,
    setSelectedNewGoalkeeper,
    assignGoalkeeper,
    confirmGoalkeeper,
    availableGoalkeepers,
  } = useGoalkeeperManagement(props);

  return (
    <>
      <ChangeGoalkeeperButton assignGoalkeeper={assignGoalkeeper} />

      <AssignGoalkeeperModal
        showGKModal={showGKModal}
        availablePlayers={availableGoalkeepers}
        setSelectedNewGoalkeeper={setSelectedNewGoalkeeper}
        setShowGKConfirmModal={setShowGKConfirmModal}
        setShowGKModal={setShowGKModal}
      />

      <ConfirmGoalkeeperModal
        showGKConfirmModal={showGKConfirmModal}
        selectedNewGoalkeeper={selectedNewGoalkeeper}
        confirmGoalkeeper={confirmGoalkeeper}
        setShowGKConfirmModal={setShowGKConfirmModal}
      />
    </>
  );
}

export default GoalkeeperManagement;