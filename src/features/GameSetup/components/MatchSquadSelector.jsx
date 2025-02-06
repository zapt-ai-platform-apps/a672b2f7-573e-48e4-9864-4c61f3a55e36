import React from 'react';

function MatchSquadSelector({ allPlayers, selectedPlayers, togglePlayer }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Select Players for This Match</h2>
      <ul>
        {allPlayers.map((player, index) => {
          const isSelected = selectedPlayers.some(
            (selected) => selected.name === player.name && selected.isInMatch
          );
          return (
            <li
              key={index}
              onClick={() => togglePlayer(player.id)}
              className={`p-4 mb-2 border rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
                isSelected ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'
              }`}
            >
              {player.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MatchSquadSelector;