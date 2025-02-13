import React from 'react';

function Header({ isRunning, toggleTimer, getTimeElapsed, handleEndGame, ourScore, opponentScore }) {
  return (
    <div className="header">
      <p>Time Elapsed: {getTimeElapsed()}</p>
      <p>Our Score: {ourScore} | Opponent Score: {opponentScore}</p>
      <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={handleEndGame}>End Game</button>
    </div>
  );
}

function SubstitutionPanel({ playerData, setPlayerData, isRunning, includeGKPlaytime, updatePlayerLists, onFieldPlayers, offFieldPlayers, getTotalPlayTime }) {
  return (
    <div className="substitution-panel">
      <p>Substitution Panel</p>
      <p>Total Playtime: {getTotalPlayTime()}</p>
    </div>
  );
}

function GameActions({ assignGoalkeeper, handleRemoveLastGoal, setShowGoalModal, setShowAddPlayerModal, handleIncreasePlayers, handleDecreasePlayers, isRunning }) {
  return (
    <div className="game-actions">
      <button onClick={assignGoalkeeper}>Assign Goalkeeper</button>
      <button onClick={handleRemoveLastGoal}>Remove Last Goal</button>
      <button onClick={() => setShowGoalModal(true)}>Show Goal Modal</button>
      <button onClick={() => setShowAddPlayerModal(true)}>Show Add Player Modal</button>
      <button onClick={handleIncreasePlayers}>Increase Players</button>
      <button onClick={handleDecreasePlayers}>Decrease Players</button>
    </div>
  );
}

function EndGameConfirmationModal({ showEndGameConfirm, confirmEndGame, cancelEndGame }) {
  if (!showEndGameConfirm) return null;
  return (
    <div className="modal">
      <p>Are you sure you want to end the game?</p>
      <button onClick={confirmEndGame}>Yes</button>
      <button onClick={cancelEndGame}>No</button>
    </div>
  );
}

function PitchVisualization() {
  return (
    <div className="pitch-visualization">
      <p>Pitch Visualization</p>
    </div>
  );
}

export { Header, SubstitutionPanel, GameActions, EndGameConfirmationModal, PitchVisualization };