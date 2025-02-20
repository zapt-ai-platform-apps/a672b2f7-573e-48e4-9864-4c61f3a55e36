import React from 'react';

interface PlayerListProps {
  players: any[];
  title: string;
  message: string;
  selectedPlayer: any;
  handlePlayerClick: (player: any) => void;
  getTotalPlayTime: (player: any) => string | number;
}

export function PlayerList({
  players,
  title,
  message,
  selectedPlayer,
  handlePlayerClick,
  getTotalPlayTime,
}: PlayerListProps): JSX.Element {
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

interface ConfirmSubstitutionModalProps {
  showModal: boolean;
  selectedSubOffPlayer: any;
  selectedSubOnPlayer: any;
  confirmSubstitution: () => void;
  cancelSubstitution: () => void;
}

export function ConfirmSubstitutionModal({
  showModal,
  selectedSubOffPlayer,
  selectedSubOnPlayer,
  confirmSubstitution,
  cancelSubstitution,
}: ConfirmSubstitutionModalProps): JSX.Element | null {
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