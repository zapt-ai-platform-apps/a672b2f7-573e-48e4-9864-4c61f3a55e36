import React from "react";
import { GoalkeeperSettingsProps } from "./GoalkeeperTypes";
import GoalkeeperSelector from "./GoalkeeperSelector";

export default function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  confirmedGoalkeeper,
  setConfirmedGoalkeeper,
}: GoalkeeperSettingsProps) {
  const handleTogglePlaytime = () => {
    setIncludeGKPlaytime(!includeGKPlaytime);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Goalkeeper Settings</h2>
      <GoalkeeperSelector
        startingPlayers={startingPlayers}
        goalkeeper={goalkeeper}
        setGoalkeeper={setGoalkeeper}
        confirmedGoalkeeper={confirmedGoalkeeper}
        setConfirmedGoalkeeper={setConfirmedGoalkeeper}
      />
      <div className="flex items-center mt-4">
        <input
          id="includeGKPlaytime"
          type="checkbox"
          checked={includeGKPlaytime}
          onChange={handleTogglePlaytime}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="includeGKPlaytime" className="ml-2 text-white">
          Include Goalkeeper Playtime
        </label>
      </div>
    </div>
  );
}