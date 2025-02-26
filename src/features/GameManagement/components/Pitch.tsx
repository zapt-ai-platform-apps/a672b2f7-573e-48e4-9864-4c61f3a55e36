import React from 'react';
import Player from './Player';
import { PitchProps } from './types';
import { motion } from 'framer-motion';

export default function Pitch({
  players = [],
  hideLabel = false,
  pitchRef,
  playerData,
  handlePointerDown
}: PitchProps): JSX.Element {
  const displayPlayers = playerData || players;
  
  return (
    <div
      ref={pitchRef}
      className="relative w-full aspect-[2/1.4] bg-gradient-to-b from-green-600 to-green-700 rounded-xl overflow-hidden shadow-lg border-4 border-white/20"
    >
      {/* Field markings */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 border-2 border-white/60 rounded-full"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/80 rounded-full"></div>
        <div className="absolute left-1 top-1/3 bottom-1/3 w-1/10 border-2 border-white/60"></div>
        <div className="absolute right-1 top-1/3 bottom-1/3 w-1/10 border-2 border-white/60"></div>
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1/6 border-2 border-white/60"></div>
        <div className="absolute right-0 top-1/4 bottom-1/4 w-1/6 border-2 border-white/60"></div>
      </div>
      
      {/* Field label */}
      {!hideLabel && (
        <motion.div 
          className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Field View
        </motion.div>
      )}
      
      {/* Debug overlay to show when players not displaying */}
      {displayPlayers && displayPlayers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/40 backdrop-blur-sm">
          <p className="text-center">No players positioned on the field</p>
        </div>
      )}
      
      {/* Players */}
      {displayPlayers && displayPlayers.map((player) => (
        <Player
          key={player.id}
          player={player}
          onPointerDown={handlePointerDown ? (e: React.PointerEvent<HTMLDivElement>) => handlePointerDown(e, player.id) : undefined}
        />
      ))}
      
      {/* Field texture overlay for realism */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBvcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] opacity-25 pointer-events-none"></div>
    </div>
  );
}