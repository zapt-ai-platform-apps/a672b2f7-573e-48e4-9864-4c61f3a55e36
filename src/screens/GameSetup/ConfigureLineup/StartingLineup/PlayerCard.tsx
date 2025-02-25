import React from 'react';

type PlayerCardProps = {
  player: { id: string; name?: string; [key: string]: any };
  isSelected: boolean;
  onToggle: () => void;
};

export default function PlayerCard({ player, isSelected, onToggle }: PlayerCardProps): JSX.Element {
  return (
    <div 
      onClick={onToggle} 
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-green-500' : 'bg-gray-700'
      }`}
    >
      <p className="text-white text-center">{player.name || 'Player'}</p>
    </div>
  );
}