import React from 'react';

export default function PlayerList({ players, title, message, getTotalPlayTime, handlePlayerClick }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4 text-sm text-gray-600">{message}</p>
      <ul>
        {players && players.length > 0 ? (
          players.map((player, index) => (
            <li 
              key={index} 
              className="mb-2 p-2 border rounded cursor-pointer hover:bg-gray-200"
              onClick={() => handlePlayerClick(player)}
            >
              <span>{player.name}</span> - <span>{getTotalPlayTime(player)}</span>
            </li>
          ))
        ) : (
          <li>No players available</li>
        )}
      </ul>
    </div>
  );
}