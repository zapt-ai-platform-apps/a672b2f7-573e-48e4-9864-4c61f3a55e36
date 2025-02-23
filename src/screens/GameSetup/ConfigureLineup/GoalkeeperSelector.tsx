import React, { ChangeEvent, useState } from "react";
import { Player } from "./GoalkeeperTypes";

interface GoalkeeperSelectorProps {
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (g: Player | null) => void;
  confirmedGoalkeeper: Player | null;
  setConfirmedGoalkeeper: (g: Player | null) => void;
}

export default function GoalkeeperSelector({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  confirmedGoalkeeper,
  setConfirmedGoalkeeper,
}: GoalkeeperSelectorProps) {
  const [localSelection, setLocalSelection] = useState<Player | null>(null);

  const handleSelectGoalkeeper = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedPlayer = startingPlayers.find(
      (player) => String(player.id) === selectedId
    );
    setLocalSelection(selectedPlayer || null);
    setGoalkeeper(selectedPlayer || null);
  };

  const handleConfirmSelection = () => {
    if (localSelection) {
      setConfirmedGoalkeeper(localSelection);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Select Goalkeeper</label>
      <select
        value={localSelection ? String(localSelection.id) : ""}
        onChange={handleSelectGoalkeeper}
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="" disabled>
          Select a player
        </option>
        {startingPlayers &&
          startingPlayers.length > 0 &&
          startingPlayers.map((player) => (
            <option key={player.id} value={String(player.id)}>
              {player.name}
            </option>
          ))}
      </select>

      {localSelection && !confirmedGoalkeeper && (
        <button
          onClick={handleConfirmSelection}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Confirm Goalkeeper
        </button>
      )}

      {confirmedGoalkeeper ? (
        <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
          <p className="text-green-700 font-semibold">
            Goalkeeper confirmed: {confirmedGoalkeeper.name}
          </p>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">
          No goalkeeper confirmed yet
        </p>
      )}
    </div>
  );
}