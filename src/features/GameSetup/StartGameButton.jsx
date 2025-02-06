import React from 'react';

export default function StartGameButton({ disabled, onStartGame }) {
  return (
    <button
      onClick={!disabled ? onStartGame : undefined}
      className={`cursor-pointer ${disabled ? 'bg-gray-400' : 'bg-purple-500'} text-white px-4 py-2 rounded`}
      disabled={disabled}
    >
      Start Game
    </button>
  );
}