import React from 'react';
import Player from './Player';

function Pitch({ pitchRef, playerData, handlePointerDown }) {
  return (
    <div
      className="relative bg-green-600 w-full max-w-4xl mx-auto h-96 rounded-lg overflow-hidden"
      ref={pitchRef}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border border-white rounded-full w-32 h-32"></div>
      </div>
      <div className="absolute inset-y-0 left-1/2 w-px bg-white opacity-75"></div>
      <div className="absolute left-0 top-1/4 w-12 h-1/2 border border-white"></div>
      <div className="absolute right-0 top-1/4 w-12 h-1/2 border border-white"></div>
      <div className="absolute left-0 top-1/3 w-6 h-1/3 border border-white"></div>
      <div className="absolute right-0 top-1/3 w-6 h-1/3 border border-white"></div>
      {playerData.filter((player) => player.isOnField).map((player, index) => (
        <Player key={index} player={player} handlePointerDown={handlePointerDown} />
      ))}
    </div>
  );
}

export default Pitch;