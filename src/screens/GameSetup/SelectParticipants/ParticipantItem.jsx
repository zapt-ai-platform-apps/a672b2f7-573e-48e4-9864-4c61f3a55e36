import React from 'react';

function ParticipantItem({ player, isSelected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded cursor-pointer transition-colors ${isSelected ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}
    >
      <p className="text-xl font-medium">{player.name}</p>
    </div>
  );
}

export default ParticipantItem;