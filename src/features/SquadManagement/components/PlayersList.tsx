import React from 'react';

interface ObjectPlayer {
  id: string;
  name: string;
}

interface PlayersListProps {
  players?: ObjectPlayer[];
  squadPlayersList?: string[];
  onDeletePlayer?: (identifier: string) => void;
}

export default function PlayersList({ players, squadPlayersList, onDeletePlayer }: PlayersListProps): JSX.Element | null {
  if (squadPlayersList && squadPlayersList.length > 0) {
    return (
      <div className="mt-2">
        <ul className="space-y-2">
          {squadPlayersList.map((player) => (
            <li
              key={player}
              className="flex justify-between items-center p-2 bg-white/10 rounded-lg"
            >
              <span className="text-white">{player}</span>
              <button
                type="button"
                onClick={() => onDeletePlayer && onDeletePlayer(player)}
                className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (players && players.length > 0) {
    return (
      <ul className="space-y-2 mt-2">
        {players.map((player) => (
          <li
            key={player.id}
            className="flex justify-between items-center p-2 bg-white/10 rounded-lg"
          >
            <span className="text-white">{player.name}</span>
            <button
              type="button"
              onClick={() => onDeletePlayer && onDeletePlayer(player.id)}
              className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}