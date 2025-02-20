import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface Player {
  id: string | number;
  position?: Position;
  isGoalkeeper?: boolean;
  name: string;
}

interface PlayerProps {
  player: Player;
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>, player: Player) => void;
}

function Player({ player, handlePointerDown }: PlayerProps) {
  const positionStyle = player.position ? {
    left: `${player.position.x}px`,
    top: `${player.position.y}px`
  } : {};

  return (
    <div
      className={`absolute w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
        ${player.isGoalkeeper ? 'bg-red-500' : 'bg-blue-500'} text-white font-medium`}
      style={positionStyle}
      onPointerDown={(e) => handlePointerDown(e, player)}
      data-testid="player-element"
    >
      {player.isGoalkeeper ? 'GK' : player.name.charAt(0)}
    </div>
  );
}

export default Player;