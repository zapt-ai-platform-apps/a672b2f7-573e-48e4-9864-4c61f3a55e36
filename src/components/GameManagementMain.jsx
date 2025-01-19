import Header from './Header';
import SubstitutionPanel from './SubstitutionPanel';
import GameActions from './GameActions';
import EndGameConfirmationModal from './EndGameConfirmationModal';
import PitchVisualization from './PitchVisualization';
import GameManagementModals from './GameManagementModals';
import createGameManagementStore from '../hooks/useGameManagement';
import { createSignal, Show } from 'solid-js';

function GameManagementMain(props) {
  const store = createGameManagementStore(props);

  // Create signal for pitch visibility
  const [showPitch, setShowPitch] = createSignal(false);

  return (
    <div class="p-8 flex-grow bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <h1 class="text-4xl font-bold mb-8 text-brand-500 dark:text-brand-400">Game Management</h1>

      <Header {...props} />

      <Show when={!props.includeGKPlaytime()}>
        <p class="mb-4 text-gray-700 dark:text-gray-300 text-center">
          Note: Playtime for goalkeepers is not tracked.
        </p>
      </Show>

      {/* Button to toggle pitch visibility */}
      <button
        class="mb-4 px-4 py-2 bg-brand-500 text-white rounded-md
              hover:bg-brand-600 transition-all duration-300 ease-in-out-custom"
        onClick={() => setShowPitch(!showPitch())}
      >
        {showPitch() ? 'Hide Pitch' : 'Show Pitch'}
      </button>

      {/* Conditionally render the pitch */}
      <Show when={showPitch()}>
        <PitchVisualization />
      </Show>

      <EndGameConfirmationModal
        showEndGameConfirm={props.showEndGameConfirm}
        confirmEndGame={props.confirmEndGame}
        cancelEndGame={props.cancelEndGame}
      />

      <SubstitutionPanel {...props} />

      <GameActions
        assignGoalkeeper={store.assignGoalkeeper}
        handleRemoveLastGoal={store.handleRemoveLastGoal}
        setShowGoalModal={store.setShowGoalModal}
        setShowAddPlayerModal={store.setShowAddPlayerModal}
        handleIncreasePlayers={store.handleIncreasePlayers}
        handleDecreasePlayers={store.handleDecreasePlayers}
        isRunning={props.isRunning}
      />

      <GameManagementModals {...props} {...store} />
    </div>
  );
}

export default GameManagementMain;