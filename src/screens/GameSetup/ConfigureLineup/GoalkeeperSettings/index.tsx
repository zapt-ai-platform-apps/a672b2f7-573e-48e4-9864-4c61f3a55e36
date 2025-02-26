import React from "react";
import { GoalkeeperSettingsProps } from "../GoalkeeperTypes";
import GoalkeeperSelector from "../GoalkeeperSelector";
import GKPlaytimeToggle from "./GKPlaytimeToggle";

export default function GoalkeeperSettings({
  startingPlayers,
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  confirmedGoalkeeper,
  setConfirmedGoalkeeper,
}: GoalkeeperSettingsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Goalkeeper Settings</h2>
      <GoalkeeperSelector
        startingPlayers={startingPlayers}
        goalkeeper={goalkeeper}
        setGoalkeeper={setGoalkeeper}
        confirmedGoalkeeper={confirmedGoalkeeper}
        setConfirmedGoalkeeper={setConfirmedGoalkeeper}
      />
      <GKPlaytimeToggle
        includeGKPlaytime={includeGKPlaytime}
        setIncludeGKPlaytime={setIncludeGKPlaytime}
      />
    </div>
  );
}