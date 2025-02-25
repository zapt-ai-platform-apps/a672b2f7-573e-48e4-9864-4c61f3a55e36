import React from 'react';
import GoalkeeperSelect from './GoalkeeperSelect';
import GKPlaytimeToggle from './GKPlaytimeToggle';
import { Player } from '../../../../types/GameTypes';

interface GoalkeeperSettingsProps {
  goalkeeper: Player | null; // Changed from string | null to Player | null
  setGoalkeeper: (gk: Player | null) => void; // Changed to accept Player | null
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (include: boolean) => void;
  squadPlayers: Player[]; // Changed from string[] to Player[]
}

function GoalkeeperSettings({
  goalkeeper,
  setGoalkeeper,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  squadPlayers
}: GoalkeeperSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <GoalkeeperSelect
          goalkeeper={goalkeeper}
          setGoalkeeper={setGoalkeeper}
          squadPlayers={squadPlayers}
        />
        {goalkeeper && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            Selected Goalkeeper: {goalkeeper.name}
          </p>
        )}
      </div>
      <GKPlaytimeToggle
        includeGKPlaytime={includeGKPlaytime}
        onToggle={(e) => setIncludeGKPlaytime(e.target.checked)}
      />
    </div>
  );
}

export default GoalkeeperSettings;