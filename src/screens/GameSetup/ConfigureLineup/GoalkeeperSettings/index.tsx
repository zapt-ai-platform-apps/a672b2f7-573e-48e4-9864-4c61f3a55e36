import React from 'react';
import GoalkeeperSelect from './GoalkeeperSelect';
import GKPlaytimeToggle from './GKPlaytimeToggle';

interface GoalkeeperSettingsProps {
  goalkeeper: string | null;
  setGoalkeeper: (gk: string | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (include: boolean) => void;
  squadPlayers: string[];
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
            Selected Goalkeeper: {goalkeeper}
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