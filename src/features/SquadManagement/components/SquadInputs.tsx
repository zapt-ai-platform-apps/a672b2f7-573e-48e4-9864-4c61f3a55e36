import React from 'react';

interface SquadNameInputProps {
  squadName: string;
  setSquadName: (name: string) => void;
}

export function SquadNameInput({ squadName, setSquadName }: SquadNameInputProps): JSX.Element {
  return (
    <input
      type="text"
      placeholder="Squad Name"
      value={squadName}
      onChange={(e) => setSquadName(e.target.value)}
      className="w-full p-2 border rounded-md"
    />
  );
}

interface PlayerInputProps {
  newSquadPlayer: string;
  setNewSquadPlayer: (player: string) => void;
  handleAddSquadPlayer: () => void;
}

export function PlayerInput({ newSquadPlayer, setNewSquadPlayer, handleAddSquadPlayer }: PlayerInputProps): JSX.Element {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Add Player"
        value={newSquadPlayer}
        onChange={(e) => setNewSquadPlayer(e.target.value)}
        className="flex-grow p-2 border rounded-l-md"
      />
      <button
        type="button"
        onClick={handleAddSquadPlayer}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
      >
        Add
      </button>
    </div>
  );
}