import React from 'react';

export function PlayerList({ players, title, message, selectedPlayer, handlePlayerClick, getTotalPlayTime }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <ul>
        {players && players.map((player) => (
          <li
            key={player.id}
            onClick={() => handlePlayerClick(player)}
            style={{
              cursor: 'pointer',
              fontWeight: selectedPlayer && selectedPlayer.id === player.id ? 'bold' : 'normal'
            }}
          >
            {player.name} - Total Play Time: {getTotalPlayTime(player)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConfirmSubstitutionModal({ showModal, selectedSubOffPlayer, selectedSubOnPlayer, confirmSubstitution, cancelSubstitution }) {
  if (!showModal) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Confirm Substitution</h3>
        <p>
          Are you sure you want to substitute {selectedSubOffPlayer && selectedSubOffPlayer.name} with {selectedSubOnPlayer && selectedSubOnPlayer.name}?
        </p>
        <button onClick={confirmSubstitution}>Confirm</button>
        <button onClick={cancelSubstitution}>Cancel</button>
      </div>
    </div>
  );
}