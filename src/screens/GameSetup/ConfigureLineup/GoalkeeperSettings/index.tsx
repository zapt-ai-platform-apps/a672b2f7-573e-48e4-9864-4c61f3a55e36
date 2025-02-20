import React from 'react';
import GoalkeeperSelect from './GoalkeeperSelect';
import GKPlaytimeToggle from './GKPlaytimeToggle';

interface GoalkeeperSettingsProps {
  startingPlayers: any[];
  goalkeeper: any;
  setGoalkeeper: (player: any) => void;
  includeGKPlaytime: boolean;
  setIncludeGKPlaytime: (value: boolean) => void;
}

export default function GoalkeeperSettings({ startingPlayers, goalkeeper, setGoalkeeper, includeGKPlaytime, setIncludeGKPlaytime }: GoalkeeperSettingsProps): JSX.Element {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const startingPlayersFiltered = startingPlayers.filter((player: any) => player.isStartingPlayer);
    const selectedPlayer = startingPlayersFiltered.find((player: any) => String(player.id) === selectedId) || null;
    setGoalkeeper(selectedPlayer);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeGKPlaytime(e.target.checked);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Goalkeeper Configuration</h2>
      <div className="space-y-6">
        <GoalkeeperSelect
          startingPlayers={startingPlayers}
          goalkeeper={goalkeeper}
          onChange={handleSelectChange}
        />
        <GKPlaytimeToggle
          includeGKPlaytime={includeGKPlaytime}
          onToggle={handleCheckboxChange}
        />
      </div>
    </div>
  );
}