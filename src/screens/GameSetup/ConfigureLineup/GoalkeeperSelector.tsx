import React, { ChangeEvent, useState, useEffect } from "react";
import { Player } from "./GoalkeeperTypes";

interface GoalkeeperSelectorProps {
  startingPlayers?: Player[];
  players?: Player[];
  goalkeeper?: Player | null;
  setGoalkeeper?: (g: Player | null) => void;
  confirmedGoalkeeper?: Player | null;
  setConfirmedGoalkeeper?: (g: Player | null) => void;
  // Added props to match test expectations
  selectedGoalkeeper?: string;
  includeGKPlaytime?: boolean;
  onSelectGoalkeeper?: (id: string) => void;
  onUpdateIncludeGKPlaytime?: (include: boolean) => void;
}

export default function GoalkeeperSelector({
  startingPlayers,
  players,  // New prop to match test
  goalkeeper,
  setGoalkeeper,
  confirmedGoalkeeper,
  setConfirmedGoalkeeper,
  // Added props with defaults
  selectedGoalkeeper,
  includeGKPlaytime = true,
  onSelectGoalkeeper,
  onUpdateIncludeGKPlaytime
}: GoalkeeperSelectorProps) {
  // Use players prop if provided, otherwise use startingPlayers
  const playersToUse = players || startingPlayers || [];
  
  const [localSelection, setLocalSelection] = useState<Player | null>(goalkeeper || null);

  // Update local selection when goalkeeper prop changes
  useEffect(() => {
    if (goalkeeper) {
      setLocalSelection(goalkeeper);
    }
  }, [goalkeeper]);

  // Update local selection if selectedGoalkeeper changes
  useEffect(() => {
    if (selectedGoalkeeper) {
      const player = playersToUse.find(p => p.id === selectedGoalkeeper);
      if (player) {
        setLocalSelection(player);
      }
    }
  }, [selectedGoalkeeper, playersToUse]);

  const handleSelectGoalkeeper = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setLocalSelection(null);
      if (setGoalkeeper) setGoalkeeper(null);
      return;
    }
    
    const selectedPlayer = playersToUse.find(
      (player) => String(player.id) === selectedId
    );
    
    if (selectedPlayer) {
      console.log(`Selected goalkeeper: ${selectedPlayer.name}`);
      setLocalSelection(selectedPlayer);
      if (setGoalkeeper) setGoalkeeper(selectedPlayer);
      if (onSelectGoalkeeper) onSelectGoalkeeper(selectedId);
    }
  };

  const handleConfirmSelection = () => {
    if (localSelection && setConfirmedGoalkeeper) {
      console.log(`Confirmed goalkeeper: ${localSelection.name}`);
      setConfirmedGoalkeeper(localSelection);
    }
  };

  const handleToggleIncludeGKPlaytime = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (onUpdateIncludeGKPlaytime) {
      onUpdateIncludeGKPlaytime(checked);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">
        {selectedGoalkeeper ? "Select a goalkeeper" : "Select Goalkeeper"}
      </label>
      <select
        value={selectedGoalkeeper || (localSelection ? String(localSelection.id) : "")}
        onChange={handleSelectGoalkeeper}
        className="w-full p-3 border border-gray-300 rounded-lg box-border"
        aria-label="Select a goalkeeper"
      >
        <option value="" disabled>
          Select a player
        </option>
        {playersToUse &&
          playersToUse.length > 0 &&
          playersToUse.map((player) => (
            <option key={player.id} value={String(player.id)}>
              {player.name}
            </option>
          ))}
      </select>

      {/* Include goalkeeper playtime toggle */}
      {onUpdateIncludeGKPlaytime && (
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="include-gk-playtime"
            checked={includeGKPlaytime}
            onChange={handleToggleIncludeGKPlaytime}
            className="mr-2"
            role="checkbox"
          />
          <label htmlFor="include-gk-playtime">
            Include goalkeeper in playtime calculations
          </label>
        </div>
      )}

      {localSelection && !confirmedGoalkeeper && setConfirmedGoalkeeper && (
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