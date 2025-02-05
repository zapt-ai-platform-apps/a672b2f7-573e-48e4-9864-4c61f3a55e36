import React from 'react';

export default function StartGameButton({ disabled }) {
  const handleClick = () => {
    console.log('Starting game...');
  };

  return (
    <button
      disabled={disabled}
      className={`cursor-pointer ${disabled ? 'bg-gray-400' : 'bg-blue-500'} text-white px-3 py-1 rounded`}
      onClick={handleClick}
    >
      Start Game
    </button>
  );
}