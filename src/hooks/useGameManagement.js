import { useState } from 'react';
import { createGameGoalHandlers } from '../features/GameManagement/hooks/gameGoals.js';
import { createPlayerHandlers } from '../features/GameManagement/hooks/playerManagement.js';

function createGameManagementStore(props) {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showRemoveGoalConfirm, setShowRemoveGoalConfirm] = useState(false);
  const [showGKModal, setShowGKModal] = useState(false);
  const [showGKConfirmModal, setShowGKConfirmModal] = useState(false);
  const [selectedNewGoalkeeper, setSelectedNewGoalkeeper] = useState(null);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustType, setAdjustType] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { recordGoal, handleRemoveLastGoal, confirmRemoveGoal, cancelRemoveGoal } = createGameGoalHandlers({
    props,
    setShowRemoveGoalConfirm
  });

  const {
    assignGoalkeeper,
    confirmGoalkeeper,
    addNewPlayer,
    handleIncreasePlayers,
    handleDecreasePlayers,
    confirmAdjustment,
    availableGoalkeepers
  } = createPlayerHandlers({
    props,
    newPlayerName,
    setNewPlayerName,
    setShowAddPlayerModal,
    setShowGKModal,
    setShowGKConfirmModal,
    setAdjustType,
    setShowAdjustModal,
    adjustType,
    selectedPlayer,
    setShowConfirmModal,
    setSelectedPlayer
  });

  return {
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
    availableGoalkeepers
  };
}

export default createGameManagementStore;