import React from 'react';

interface Player {
  id: string;
  name: string;
  selected: boolean;
}

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onToggle: () => void;
}

export default function PlayerCard({ player, isSelected, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div 
      onClick={onToggle} 
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
    >
      <h2 className="text-xl font-semibold mb-2">{player.name}</h2>
      <p className="text-sm">{isSelected ? 'Selected' : 'Not Selected'}</p>
    </div>
  );
}