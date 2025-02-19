import React from 'react';

function ParticipantItem({ player, isSelected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded cursor-pointer ${isSelected ? 'bg-green-100' : 'bg-white'}`}
    >
      <p>
        {typeof player.name === 'object'
          ? player.name.name || JSON.stringify(player.name)
          : player.name}
      </p>
    </div>
  );
}

export default ParticipantItem;