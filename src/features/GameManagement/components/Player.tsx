import React from 'react';
import { Player as PlayerType } from '../../../types/GameTypes';

interface PlayerProps {
  player: PlayerType;
  onDragStart?: (id: string) => void;
}

const Player: React.FC<PlayerProps> = ({ player, onDragStart }) => {
  const handlePointerDown = (e: React.PointerEvent) => {
    if (onDragStart) {
      e.preventDefault();
      onDragStart(player.id);
    }
  };

  // Display only first name or shortened name if too long
  const displayName = player.name.includes(' ')
    ? player.name.split(' ')[0]
    : player.name.length > 10
    ? `${player.name.substring(0, 8)}...`
    : player.name;
    
  return (
    <div
      className={`player ${player.isGoalkeeper ? 'goalkeeper' : ''}`}
      style={{
        position: 'absolute',
        left: `${player.position.x}%`,
        top: `${player.position.y}%`,
        transform: 'translate(-50%, -50%)',
        backgroundColor: player.isGoalkeeper ? '#ffcc00' : '#4299e1',
        color: '#fff',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        zIndex: 10
      }}
      onPointerDown={handlePointerDown}
      data-player-id={player.id} // Adding data-player-id attribute for tests
      role="button"
      aria-label={`Player ${player.name}`}
    >
      {displayName}
    </div>
  );
};

export default Player;