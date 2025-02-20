import React from 'react';

interface SquadPlayersProps {
  newSquadPlayer: string;
  setNewSquadPlayer: (value: string) => void;
  squadPlayersList: any[];
  handleAddSquadPlayer: () => void;
  handleDeleteSquadPlayer: (index: number) => void;
}

export default function SquadPlayers({
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList = [],
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
}: SquadPlayersProps): JSX.Element {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Add Squad Player</label>
        <div className="flex">
          <input
            type="text"
            value={newSquadPlayer}
            onChange={(e) => setNewSquadPlayer(e.target.value)}
            className="flex-1 p-2 border rounded-l box-border"
          />
          <button
            type="button"
            onClick={handleAddSquadPlayer}
            className="px-4 bg-blue-500 text-white rounded-r cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-4">
        <ul>
          {squadPlayersList.map((player, index) => (
            <li key={index} className="flex items-center justify-between py-1 border-b last:border-0">
              <span className="text-lg">
                {typeof player === 'object' ? player.name : player}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteSquadPlayer(index)}
                className="text-red-500 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}