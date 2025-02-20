import React, { ChangeEvent } from "react";

interface Player {
  id: string | number;
  name: string;
}

interface GoalkeeperSettingsProps {
  startingPlayers: Player[];
  goalkeeper: Player | null;
  setGoalkeeper: (g: Player | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (value: boolean) => void;
}

export default function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
}: GoalkeeperSettingsProps) {
  const handleSelectGoalkeeper = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedPlayer = startingPlayers.find(player => String(player.id) === selectedId);
    setGoalkeeper(selectedPlayer || null);
  };

  const handleTogglePlaytime = () => {
    setIncludeGKPlaytime(!includeGKPlaytime);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Goalkeeper Settings</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Goalkeeper</label>
        <select
          value={goalkeeper ? String(goalkeeper.id) : ""}
          onChange={handleSelectGoalkeeper}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>
            Select a player
          </option>
          {startingPlayers && startingPlayers.length > 0 && startingPlayers.map((player) => (
            <option key={player.id} value={String(player.id)}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          id="includeGKPlaytime"
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={handleTogglePlaytime}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="includeGKPlaytime" className="ml-2 text-gray-700">
          Include Goalkeeper Playtime
        </label>
      </div>
    </div>
  );
}