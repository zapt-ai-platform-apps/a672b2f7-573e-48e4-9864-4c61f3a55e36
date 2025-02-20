import React from 'react';

interface SubstitutionPanelProps {
  playerData: any[];
  setPlayerData: React.Dispatch<React.SetStateAction<any[]>>;
  isRunning: boolean;
  includeGKPlaytime: boolean;
  updatePlayerLists: (playerData: any[]) => void;
  onFieldPlayers?: any[];
  offFieldPlayers?: any[];
  getTotalPlayTime: () => string;
}

export function SubstitutionPanel({
  playerData,
  setPlayerData,
  isRunning,
  includeGKPlaytime,
  updatePlayerLists,
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime
}: SubstitutionPanelProps) {
  return (
    <div className="mt-6 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Substitution Panel</h2>
      <div>
        <span className="block mb-2">Playtime: {getTotalPlayTime()}</span>
        <button 
          className="mr-2 px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
          onClick={() => updatePlayerLists(playerData)}
        >
          Update Players
        </button>
      </div>
    </div>
  );
}