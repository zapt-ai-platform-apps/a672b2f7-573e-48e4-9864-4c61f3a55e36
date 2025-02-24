import React from "react";
import PlayerInput from "./PlayerInput";
import PlayersList from "./PlayersList";

export interface PlayersManagerProps {
  squadPlayersList: string[];
  newPlayerName: string;
  setNewPlayerName: (value: string) => void;
  handleAddPlayer: () => void;
  handleDeletePlayer: (playerName: string) => void;
}

function PlayersManager({
  squadPlayersList,
  newPlayerName,
  setNewPlayerName,
  handleAddPlayer,
  handleDeletePlayer,
}: PlayersManagerProps) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
        Players
      </label>
      <PlayerInput
        newPlayerName={newPlayerName}
        setNewPlayerName={setNewPlayerName}
        handleAddPlayer={handleAddPlayer}
      />
      {squadPlayersList.length > 0 ? (
        <PlayersList 
          squadPlayersList={squadPlayersList}
          handleDeletePlayer={handleDeletePlayer} 
        />
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-sm italic">
          No players added yet. Add players to your squad using the field above.
        </div>
      )}
    </div>
  );
}

export default PlayersManager;