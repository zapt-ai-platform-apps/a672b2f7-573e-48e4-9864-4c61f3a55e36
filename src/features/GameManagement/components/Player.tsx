import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface PlayerProps {
  player: {
    id: string;
    name: string;
    isGoalkeeper?: boolean;
    [key: string]: any;
  };
  position: Position;
  onPointerDown?: (e: React.PointerEvent) => void;
}

function Player({ player, position, onPointerDown }: PlayerProps): JSX.Element {
  // Default position if not provided
  const pos = position || { x: 50, y: 50 };
  
  // Calculate position as percentage of parent container
  const style = {
    left: `${pos.x}%`,
    top: `${pos.y}%`,
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full select-none touch-none ${
        player.isGoalkeeper
          ? 'bg-yellow-500 text-black'
          : 'bg-blue-600 text-white'
      } shadow-md border-2 border-white cursor-move ${onPointerDown ? 'hover:scale-110' : ''} transition-transform`}
      style={style}
      onPointerDown={onPointerDown}
      data-player-id={player.id}
    >
      <div className="text-xs font-semibold truncate max-w-[90%] text-center pointer-events-none">
        {player.name.split(' ')[0]}
      </div>
    </div>
  );
}

export default Player;