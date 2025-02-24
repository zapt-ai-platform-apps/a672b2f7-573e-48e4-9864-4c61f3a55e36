import React from 'react';
import { formatTime } from '../../../models/timeUtils';

interface PlayerListProps {
  players: any[];
  title: string;
  message: string;
  getTotalPlayTime: (player: any) => number;
  handlePlayerClick: (player: any) => void;
}

export default function PlayerList({
  players,
  title,
  message,
  getTotalPlayTime,
  handlePlayerClick
}: PlayerListProps): JSX.Element {
  if (!players || players.length === 0) {
    return (
      <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg text-white">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm opacity-80">{message}</p>
        <p className="mt-4 text-sm italic">No players available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg text-white">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm opacity-80 mb-4">{message}</p>
      <ul className="space-y-2">
        {players.map((player) => (
          <li
            key={player.id}
            className="flex justify-between items-center p-3 bg-white/20 rounded-lg cursor-pointer hover:bg-white/30 transition-colors"
            onClick={() => handlePlayerClick(player)}
          >
            <span>{player.name}</span>
            <span className="text-sm opacity-80">{formatTime(getTotalPlayTime(player))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}