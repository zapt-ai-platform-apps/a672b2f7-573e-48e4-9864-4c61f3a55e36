import React from 'react';

interface SquadPlayersListProps {
  squadPlayersList: any[];
  handleDeleteSquadPlayer: (player: any) => void;
}

export default function SquadPlayersList({ squadPlayersList, handleDeleteSquadPlayer }: SquadPlayersListProps): JSX.Element {
  return (
    <ul className="space-y-2">
      {squadPlayersList.map((player, index) => (
        <li key={index} className="flex justify-between items-center border p-2 rounded-md">
          <span>{player}</span>
          <button
            type="button"
            onClick={() => handleDeleteSquadPlayer(player)}
            className="text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}