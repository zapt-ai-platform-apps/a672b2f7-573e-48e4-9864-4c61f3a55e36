import Header from './Header';
import SubstitutionPanel from './SubstitutionPanel';
import GameActions from './GameActions';
import EndGameConfirmationModal from './EndGameConfirmationModal';
import GoalScoredModal from './GoalScoredModal';
import AssignGoalkeeperModal from './AssignGoalkeeperModal';
import ConfirmGoalkeeperModal from './ConfirmGoalkeeperModal';
import AddPlayerModal from './AddPlayerModal';
import AdjustPlayersModal from './AdjustPlayersModal';
import ConfirmAdjustPlayersModal from './ConfirmAdjustPlayersModal';
import RemoveGoalConfirmationModal from './RemoveGoalConfirmationModal';
import createGameManagementStore from '../hooks/useGameManagement';

function GameManagementMain(props) {
  const {
    // State variables
    showGoalModal,
    setShowGoalModal,
    showRemoveGoalConfirm,
    setShowRemoveGoalConfirm,
    showGKModal,
    setShowGKModal,
    showGKConfirmModal,
    setShowGKConfirmModal,
    selectedNewGoalkeeper,
    setSelectedNewGoalkeeper,
    showAddPlayerModal,
    setShowAddPlayerModal,
    newPlayerName,
    setNewPlayerName,
    showAdjustModal,
    setShowAdjustModal,
    adjustType,
    setAdjustType,
    selectedPlayer,
    setSelectedPlayer,
    showConfirmModal,
    setShowConfirmModal,

    // Functions
    recordGoal,
    handleRemoveLastGoal,
    confirmRemoveGoal,
    cancelRemoveGoal,
    assignGoalkeeper,
    confirmGoalkeeper,
    addNewPlayer,
    handleIncreasePlayers,
    handleDecreasePlayers,
    confirmAdjustment,
    availableGoalkeepers,
  } = createGameManagementStore(props);

  return (
    <div class="p-8 flex-grow bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 class="text-4xl font-bold mb-8 text-green-600 dark:text-green-400">Game Management</h1>

      <Header {...props} />

      <Show when={!props.includeGKPlaytime()}>
        <p class="mb-4 text-gray-700 dark:text-gray-300 text-center">
          Note: Playtime for goalkeepers is not tracked.
        </p>
      </Show>

      <EndGameConfirmationModal
        showEndGameConfirm={props.showEndGameConfirm}
        confirmEndGame={props.confirmEndGame}
        cancelEndGame={props.cancelEndGame}
      />

      <SubstitutionPanel {...props} />

      <GameActions
        assignGoalkeeper={assignGoalkeeper}
        handleRemoveLastGoal={handleRemoveLastGoal}
        setShowGoalModal={setShowGoalModal}
        setShowAddPlayerModal={setShowAddPlayerModal}
        handleIncreasePlayers={handleIncreasePlayers}
        handleDecreasePlayers={handleDecreasePlayers}
        isRunning={props.isRunning}
      />

      {/* Modals */}
      <GoalScoredModal
        showGoalModal={showGoalModal}
        setShowGoalModal={setShowGoalModal}
        players={props.onFieldPlayers}
        recordGoal={recordGoal}
      />

      <RemoveGoalConfirmationModal
        showRemoveGoalConfirm={showRemoveGoalConfirm}
        confirmRemoveGoal={confirmRemoveGoal}
        cancelRemoveGoal={cancelRemoveGoal}
      />

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

      <AddPlayerModal
        showAddPlayerModal={showAddPlayerModal}
        setShowAddPlayerModal={setShowAddPlayerModal}
        newPlayerName={newPlayerName}
        setNewPlayerName={setNewPlayerName}
        addNewPlayer={addNewPlayer}
      />

      <AdjustPlayersModal
        showAdjustModal={showAdjustModal}
        setShowAdjustModal={setShowAdjustModal}
        adjustType={adjustType}
        onFieldPlayers={props.onFieldPlayers}
        offFieldPlayers={props.offFieldPlayers}
        setSelectedPlayer={setSelectedPlayer}
        setShowConfirmModal={setShowConfirmModal}
      />

      <ConfirmAdjustPlayersModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        selectedPlayer={selectedPlayer}
        adjustType={adjustType}
        confirmAdjustment={confirmAdjustment}
      />
    </div>
  );
}

export default GameManagementMain;