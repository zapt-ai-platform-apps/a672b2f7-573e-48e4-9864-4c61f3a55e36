import React from 'react';
import GoalkeeperSelect from './GoalkeeperSelect';
import GKPlaytimeToggle from './GKPlaytimeToggle';

interface GoalkeeperSettingsProps {
  selectedGK: string | null;
  setSelectedGK: (gk: string | null) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (include: boolean) => void;
  squadPlayers: string[];
}

function GoalkeeperSettings({
  selectedGK,
  setSelectedGK,
  includeGKPlaytime,
  setIncludeGKPlaytime,
  squadPlayers
}: GoalkeeperSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <GoalkeeperSelect
          selectedGK={selectedGK}
          setSelectedGK={setSelectedGK}
          squadPlayers={squadPlayers}
        />
        {selectedGK && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            Selected Goalkeeper: {selectedGK}
          </p>
        )}
      </div>
      <GKPlaytimeToggle
        includeGKPlaytime={includeGKPlaytime}
        setIncludeGKPlaytime={setIncludeGKPlaytime}
      />
    </div>
  );
}

export default GoalkeeperSettings;