import React from "react";
import { Player } from "../../../../types/GameTypes";

interface GoalkeeperSelectProps {
  players: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (player: Player | null) => void;
}

export default function GoalkeeperSelect({
  players,
  goalkeeper,
  setGoalkeeper,
}: GoalkeeperSelectProps): JSX.Element {
  const handleSelectGoalkeeper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === "") {
      setGoalkeeper(null);
      return;
    }

    const selectedPlayer = players.find((player) => player.id === selectedId);
    if (selectedPlayer) {
      setGoalkeeper(selectedPlayer);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="goalkeeper"
        className="block text-sm font-medium text-white mb-1"
      >
        Select Goalkeeper
      </label>
      <select
        id="goalkeeper"
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900 box-border"
        onChange={handleSelectGoalkeeper}
        value={goalkeeper?.id || ""}
      >
        <option value="">Select a player</option>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
      {goalkeeper && (
        <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded-md">
          Current goalkeeper: {goalkeeper.name}
        </div>
      )}
    </div>
  );
}