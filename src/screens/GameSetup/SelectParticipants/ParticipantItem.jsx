import React from 'react';

function ParticipantItem({ player, isSelected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-800">{player.name}</span>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ParticipantItem;