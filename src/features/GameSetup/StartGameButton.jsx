import React from 'react';

/**
 * StartGameButton component renders a button to start the game.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.disabled - Flag that disables the button when true.
 * @param {Function} props.onStartGame - Callback function invoked when the button is clicked.
 * @returns {JSX.Element} Rendered start game button.
 */
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