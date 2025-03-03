import React, { useState } from 'react';
import Header from '@/modules/game/ui/Header.jsx';
import SubstitutionPanel from '@/modules/game/ui/SubstitutionPanel.jsx';
import GameActions from '@/modules/game/ui/GameActions.jsx';
import EndGameConfirmationModal from '@/modules/game/ui/EndGameConfirmationModal.jsx';
import PitchVisualization from '@/modules/game/ui/PitchVisualization.jsx';
import GameManagementModals from '@/features/GameManagement/GameManagementModals.jsx';
import createGameManagementStore from '@/hooks/useGameManagement';

function GameManagementMain(props) {
  const store = createGameManagementStore(props);
  const [showPitch, setShowPitch] = useState(false);

  return (
    <div className="p-8 flex-grow bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-brand-500 dark:text-brand-400">Game Management</h1>

      <Header {...props} />

      {!props.includeGKPlaytime && (
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">
          Note: Playtime for goalkeepers is not tracked.
        </p>
      )}

      <button
        className="mb-4 px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-all duration-300 ease-in-out-custom"
        onClick={() => setShowPitch(!showPitch)}
      >
        {showPitch ? 'Hide Pitch' : 'Show Pitch'}
      </button>

      {showPitch && <PitchVisualization />}

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