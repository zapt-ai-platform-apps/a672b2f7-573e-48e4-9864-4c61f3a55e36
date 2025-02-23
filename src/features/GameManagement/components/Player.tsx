import React from 'react';
import type { Player } from "../../../types/GameTypes";

interface Position {
  x: number;
  y: number;
}

interface PlayerProps {
  player: Player;
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>, player: Player) => void;
}

function Player({ player, handlePointerDown }: PlayerProps) {
  const positionStyle = player.position ? {
    left: `${player.position.x}%`,
    top: `${player.position.y}%`
  } : {};

  return (
    <div
      className={`absolute w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
        ${player.isGoalkeeper 
          ? 'bg-red-500 border-2 border-yellow-300' 
          : 'bg-blue-500'} text-white font-medium shadow-lg`}
      style={positionStyle}
      onPointerDown={(e) => handlePointerDown(e, player)}
      data-testid="player-element"
    >
      {player.isGoalkeeper ? 'GK' : player.name.charAt(0)}
      {player.isGoalkeeper && (
        <div className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs px-1 rounded-full">
          GK
        </div>
      )}
    </div>
  );
}

export default Player;