import React from 'react';

function Player({ player, handlePointerDown }) {
  const playerColorClass = player.isGoalkeeper ? 'bg-red-500 dark:bg-red-700' : 'bg-blue-500 dark:bg-blue-700';

  const style = {
    top: player.position && player.position.y !== null ? `${player.position.y - 15}px` : '50%',
    left: player.position && player.position.x !== null ? `${player.position.x - 15}px` : '50%',
    width: '30px',
    height: '30px',
    transform: 'translate(-50%, -50%)'
  };

  // Use media query to adjust size on larger screens
  if (window.innerWidth >= 768) {
    style.width = '40px';
    style.height = '40px';
    style.top = player.position && player.position.y !== null ? `${player.position.y - 20}px` : '50%';
    style.left = player.position && player.position.x !== null ? `${player.position.x - 20}px` : '50%';
  }

  return (
    <div
      className={`absolute cursor-pointer flex items-center justify-center ${playerColorClass} text-white rounded-full text-xs md:text-sm`}
      style={style}
      onMouseDown={(e) => handlePointerDown(e, player)}
      onTouchStart={(e) => {
        // Prevent scrolling when dragging players
        e.preventDefault();
        handlePointerDown(e, player);
      }}
    >
      {player.isGoalkeeper ? 'GK' : player.name.charAt(0)}
    </div>
  );
}

export default Player;