import React from 'react';

interface PlayerSelectionListProps {
  availablePlayers: string[];
  onSelect: (playerName: string) => void;
  onSwitch: () => void;
}

function PlayerSelectionList({ availablePlayers, onSelect, onSwitch }: PlayerSelectionListProps) {
  return (
    <div className="mb-4">
      <ul className="list-disc pl-5">
        {availablePlayers.map((player, index) => (
          <li
            key={index}
            className="cursor-pointer hover:text-brand-500"
            onClick={() => onSelect(player)}
          >
            {player}
          </li>
        ))}
      </ul>
      <button
        className="mt-2 text-sm text-blue-500 hover:underline"
        onClick={onSwitch}
      >
        Switch to manual entry
      </button>
    </div>
  );
}

export default PlayerSelectionList;