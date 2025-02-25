import React from 'react';
import PlayerList from '../../../features/GameManagement/components/PlayerList'; // Corrected import path
import { timeFormatter } from '../utils/timeFormatter';
import { Player } from '../../../types/GameTypes';

export interface PlayersSectionProps {
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (player: Player) => number;
  handlePlayerClick: (player: Player) => void;
}

export function PlayersSection({
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime,
  handlePlayerClick
}: PlayersSectionProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <PlayerList
        players={onFieldPlayers}
        title="On Field Players"
        emptyMessage="No players currently on the field"
        getTotalPlayTime={getTotalPlayTime}
        onPlayerClick={handlePlayerClick}
        selectedPlayer={null}
        timeFormatter={timeFormatter}
        selectedItemClass="bg-blue-100 dark:bg-blue-900"
        defaultItemClass="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        showGoalkeeper={true}
      />
      <PlayerList
        players={offFieldPlayers}
        title="Bench Players"
        emptyMessage="No players currently on the bench"
        getTotalPlayTime={getTotalPlayTime}
        onPlayerClick={handlePlayerClick}
        selectedPlayer={null}
        timeFormatter={timeFormatter}
        selectedItemClass="bg-blue-100 dark:bg-blue-900"
        defaultItemClass="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
      />
    </div>
  );
}

export default PlayersSection;