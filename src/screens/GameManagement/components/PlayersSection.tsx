import React from 'react';
import PlayerList from '../../../features/GameManagement/components/PlayerList';
import { timeFormatter } from '../utils/timeFormatter';
import type { Player } from '../../../types/GameTypes';

interface PlayersSectionProps {
  onFieldPlayers: Player[];
  offFieldPlayers: Player[];
  getTotalPlayTime: (player: Player) => number;
  handlePlayerClick: (player: Player) => void;
}

export default function PlayersSection({
  onFieldPlayers,
  offFieldPlayers,
  getTotalPlayTime,
  handlePlayerClick
}: PlayersSectionProps): JSX.Element {
  // Return an empty fragment instead of null to satisfy JSX.Element return type
  return <></>;
}