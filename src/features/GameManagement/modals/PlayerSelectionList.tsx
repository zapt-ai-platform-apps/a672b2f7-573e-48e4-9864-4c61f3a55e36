import React from 'react';

interface PlayerSelectionListProps {
  availablePlayers: string[];
  onSelect: (playerName: string) => void;
  onSwitch: () => void;
}

function PlayerSelectionList({ availablePlayers, onSelect, onSwitch }: PlayerSelectionListProps) {
  return (
    <div className="mb-4">
      <ul className="mb-4">
        {availablePlayers.map((player) => (
          <li key={player} className="py-2 border-b">
            <button
              onClick={() => onSelect(player)}
              className="text-blue-600 hover:underline"
            >
              {player}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onSwitch}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Switch to manual entry
      </button>
    </div>
  );
}

export default PlayerSelectionList;