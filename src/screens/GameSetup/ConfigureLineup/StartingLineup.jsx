import React from 'react';

export default function StartingLineup({ startingPlayers, toggleStartingPlayer }) {
  return (
    <div>
      {startingPlayers.map(player => (
        <div 
          key={player.id} 
          onClick={() => toggleStartingPlayer(player.id)}
          className="p-4 border rounded mb-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {player.name}
        </div>
      ))}
    </div>
  );
}