import React, { useState } from 'react';

interface Player {
  id: string;
  name: string;
}

interface ScorerSelectionProps {
  players: Player[];
  scorerName: string;
  setScorerName: (name: string) => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function ScorerSelection({
  players,
  scorerName,
  setScorerName,
  handleConfirm,
  handleCancel,
}: ScorerSelectionProps) {
  const [selected, setSelected] = useState(scorerName);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    setScorerName(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-gray-800 dark:text-white">Select Scorer:</label>
      <select value={selected} onChange={handleChange} className="box-border p-2 border rounded">
        <option value="">-- Choose Scorer --</option>
        {players.map((player) => (
          <option key={player.id} value={player.name}>
            {player.name}
          </option>
        ))}
      </select>
      <div className="flex justify-end gap-2">
        <button onClick={handleCancel} className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
        <button onClick={handleConfirm} className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          Confirm
        </button>
      </div>
    </div>
  );
}