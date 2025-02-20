import React from "react";

interface ParticipantItemProps {
  player: {
    name: string | { name?: string };
  };
  isSelected: boolean;
  onToggle: () => void;
}

function ParticipantItem({ player, isSelected, onToggle }: ParticipantItemProps) {
  return (
    <div
      onClick={onToggle}
      className={`p-4 border rounded cursor-pointer ${isSelected ? "bg-green-100" : "bg-white"}`}
    >
      <p>
        {typeof player.name === "object"
          ? player.name.name || JSON.stringify(player.name)
          : player.name}
      </p>
    </div>
  );
}

export default ParticipantItem;