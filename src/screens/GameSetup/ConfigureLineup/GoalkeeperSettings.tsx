import React, { ChangeEvent } from 'react';

interface GoalkeeperSettingsProps {
  startingPlayers: any[];
  goalkeeper: string | null;
  setGoalkeeper: (value: string | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (value: boolean) => void;
}

export default function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime
}: GoalkeeperSettingsProps): JSX.Element {
  const handleSelectGoalkeeper = (e: ChangeEvent<HTMLSelectElement>) => {
    setGoalkeeper(e.target.value);
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
          value={goalkeeper || ""}
          onChange={handleSelectGoalkeeper}
          className="w-full p-3 border border-gray-300 rounded-lg box-border"
        >
          <option value="" disabled>
            Select a player
          </option>
          {startingPlayers && startingPlayers.length > 0 && startingPlayers.map((player, index) => (
            <option key={index} value={player.name}>
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