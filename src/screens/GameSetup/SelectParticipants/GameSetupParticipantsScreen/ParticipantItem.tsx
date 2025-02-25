import React from "react";
import { ExtendedPlayer } from "../../../../features/GameSetup/types/ExtendedPlayer";

interface ParticipantItemProps {
  player: ExtendedPlayer;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps): JSX.Element {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer p-4 border rounded ${isSelected ? "bg-blue-200" : "bg-gray-100"}`}
    >
      <p className="font-semibold">ID: {player.id}</p>
      {"name" in player && player.name && (
        <p className="text-sm">Name: {player.name}</p>
      )}
    </div>
  );
}