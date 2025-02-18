import React from 'react';
import Player from './Player.jsx';

function Pitch({ pitchRef, playerData, handlePointerDown }) {
  return (
    <div
      className="relative bg-green-600 w-full max-w-4xl mx-auto h-96 rounded-lg overflow-hidden"
      ref={pitchRef}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border-2 border-white rounded-full w-32 h-32"></div>
      </div>
      <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white opacity-75"></div>
      {playerData.filter(p => p.isOnField).map((player, index) => (
        <Player 
          key={player.id}
          player={player}
          handlePointerDown={handlePointerDown}
        />
      ))}
    </div>
  );
}

export default Pitch;