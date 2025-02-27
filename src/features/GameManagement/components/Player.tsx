import React from 'react';
import { Player as PlayerType } from '../../../types/GameTypes';

interface PlayerProps {
  player: PlayerType;
  onDragStart?: (playerId: string) => void;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  showStatus?: boolean;
}

const Player: React.FC<PlayerProps> = ({ player, onDragStart, onPointerDown, showStatus }) => {
  const handleDragStart = () => {
    if (onDragStart) {
      onDragStart(player.id);
    }
  };

  return (
    <div
      className="player-token"
      style={{
        position: 'absolute',
        left: `${player.position.x}%`,
        top: `${player.position.y}%`,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: player.isGoalkeeper ? '#ffcc00' : '#ffffff',
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        userSelect: 'none',
        touchAction: 'none'
      }}
      onPointerDown={onPointerDown || handleDragStart}
      data-player-id={player.id.toString()}
    >
      <span className="sr-only">{player.name}</span>
      <span style={{
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {player.name.slice(0, 2)}
      </span>
      {showStatus && player.status && (
        <div className="absolute -bottom-5 text-xs font-medium bg-white px-1 rounded">
          {player.status}
        </div>
      )}
    </div>
  );
};

export default Player;