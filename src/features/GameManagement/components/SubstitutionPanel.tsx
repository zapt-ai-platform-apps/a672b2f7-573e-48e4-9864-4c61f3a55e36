import React from 'react';

interface SubstitutionPanelProps {
  playerData: any[];
  setPlayerData?: React.Dispatch<React.SetStateAction<any[]>>;
  isRunning: boolean;
  includeGKPlaytime?: boolean;
  updatePlayerLists?: (playerData: any[]) => void;
  onFieldPlayers?: any[];
  offFieldPlayers?: any[];
  getTotalPlayTime: () => string;
}

function SubstitutionPanel({
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
      <p className="text-sm text-gray-600 mb-4">
        This panel displays the current playtime for players and allows you to manage substitutions during the game.
        Use the 'Update Players' button to refresh the latest on-field status.
      </p>
      <div>
        <span className="block mb-2">Playtime: {getTotalPlayTime()}</span>
        {updatePlayerLists && (
          <button 
            className="mr-2 px-4 py-2 bg-green-600 text-white rounded cursor-pointer disabled:opacity-50"
            onClick={() => updatePlayerLists(playerData)}
            disabled={!isRunning}
          >
            Update Players
          </button>
        )}
      </div>
    </div>
  );
}

export default SubstitutionPanel;