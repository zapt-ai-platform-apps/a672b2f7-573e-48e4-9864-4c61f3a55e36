import React from 'react';

interface SquadInputsProps {
  localName: string;
  setLocalName: (name: string) => void;
  setSquadName: (name: string) => void;
  newSquadPlayer: string;
  setNewSquadPlayer: (name: string) => void;
  handleAddSquadPlayer: () => void;
}

export default function SquadInputs({
  localName,
  setLocalName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  handleAddSquadPlayer,
}: SquadInputsProps): JSX.Element {
  return (
    <>
      <div>
        <label className="block text-lg mb-2">Squad Name:</label>
        <input
          type="text"
          value={localName}
          onChange={(e) => {
            setLocalName(e.target.value);
            setSquadName(e.target.value);
          }}
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded box-border text-lg"
          placeholder="Enter squad name"
        />
      </div>
      <div>
        <label className="block text-lg mb-2">Add New Player:</label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newSquadPlayer}
            onChange={(e) => setNewSquadPlayer(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded box-border text-lg"
            placeholder="Player Name"
          />
          <button
            type="button"
            onClick={handleAddSquadPlayer}
            className="px-6 py-4 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}