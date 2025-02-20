import React from 'react';

interface SquadFormProps {
  squadName: string;
  setSquadName: (name: string) => void;
  newSquadPlayer: string;
  setNewSquadPlayer: (player: string) => void;
  squadPlayersList: any[];
  handleAddSquadPlayer: () => void;
  handleDeleteSquadPlayer: (player: any) => void;
  handleCreateSquad?: () => void;
  onUpdateSquad?: () => void;
  editMode?: boolean;
  loading: boolean;
}

export default function SquadForm({
  squadName,
  setSquadName,
  newSquadPlayer,
  setNewSquadPlayer,
  squadPlayersList,
  handleAddSquadPlayer,
  handleDeleteSquadPlayer,
  handleCreateSquad,
  onUpdateSquad,
  editMode = false,
  loading,
}: SquadFormProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && onUpdateSquad) {
      onUpdateSquad();
    } else if (!editMode && handleCreateSquad) {
      handleCreateSquad();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Squad Name</label>
        <input
          type="text"
          value={squadName}
          onChange={(e) => setSquadName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">New Squad Player</label>
        <input
          type="text"
          value={newSquadPlayer}
          onChange={(e) => setNewSquadPlayer(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleAddSquadPlayer}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          Add Player
        </button>
      </div>
      <div className="mb-4">
        <ul>
          {squadPlayersList.map((player, index) => (
            <li key={index} className="flex items-center justify-between py-1">
              <span>{player}</span>
              <button
                type="button"
                onClick={() => handleDeleteSquadPlayer(player)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-green-500 text-white text-lg rounded-md hover:bg-green-600 transition-colors"
        disabled={loading}
      >
        {editMode ? 'Update Squad' : 'Create Squad'}
      </button>
    </form>
  );
}