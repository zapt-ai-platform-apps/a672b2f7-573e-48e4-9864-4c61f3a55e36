import React from 'react';
import type { Player as PlayerType } from '../../../types/GameTypes';

export interface PlayerProps {
  player: PlayerType;
  showStatus?: boolean;
  onPointerDown?: (event: React.PointerEvent<Element>, playerId?: string) => void;
  onDragStart?: (playerId: string) => void;
}

function Player({ player, showStatus = true, onPointerDown, onDragStart }: PlayerProps): JSX.Element {
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (onPointerDown) {
      onPointerDown(event, player.id?.toString());
    }
    
    // Call onDragStart if it exists
    if (onDragStart && player.id) {
      onDragStart(player.id.toString());
    }
  };

  return (
    <div
      className="player-token w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold cursor-move shadow-md"
      style={{
        backgroundColor: player.isGoalkeeper ? '#ffcc00' : '#3b82f6',
        color: player.isGoalkeeper ? '#000' : '#fff'
      }}
      onPointerDown={handlePointerDown}
      data-player-id={player.id}
      data-testid={`player-token-${player.id}`}
    >
      {/* Display player name for test case, otherwise show number or fallback */}
      <span className="sr-only">{player.name}</span>
      {player.number || '?'}
      {showStatus && player.status && (
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500"></div>
      )}
    </div>
  );
}

export default Player;