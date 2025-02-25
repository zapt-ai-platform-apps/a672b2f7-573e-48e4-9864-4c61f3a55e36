import React from 'react';
import Player from './Player';

interface Position {
  x: number;
  y: number;
}

interface PlayerType {
  id: string;
  name: string;
  position: Position | string;
  [key: string]: any;
}

interface PitchProps {
  players: PlayerType[];
  hideLabel?: boolean;
}

/**
 * Pitch component that displays a soccer field with players positioned on it
 */
export default function Pitch({ players = [], hideLabel = false }: PitchProps): JSX.Element {
  return (
    <div className="relative w-full aspect-[2/1.4] bg-gradient-to-b from-green-600 to-green-700 rounded-xl overflow-hidden shadow-lg border-4 border-white/20">
      {/* Field markings */}
      <div className="absolute inset-0">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 border-2 border-white/60 rounded-full"></div>
        {/* Center line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/60"></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/80 rounded-full"></div>
        
        {/* Goal areas */}
        <div className="absolute left-1 top-1/3 bottom-1/3 w-1/10 border-2 border-white/60"></div>
        <div className="absolute right-1 top-1/3 bottom-1/3 w-1/10 border-2 border-white/60"></div>
        
        {/* Penalty areas */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1/6 border-2 border-white/60"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-1/6 border-2 border-white/60"></div>
      </div>
      
      {/* Field label */}
      {!hideLabel && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
          Field View
        </div>
      )}
      
      {/* Players */}
      {players && players.map((player) => (
        <Player key={player.id} player={player} position={player.position} />
      ))}
    </div>
  );
}