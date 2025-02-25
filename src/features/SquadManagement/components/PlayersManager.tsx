import React, { useState } from 'react';
import PlayerInput from './PlayerInput';
import PlayersList from './PlayersList';

export interface Player {
  id: string;
  name: string;
  isOnField?: boolean;
  isGoalkeeper?: boolean;
  isStartingPlayer?: boolean;
  position?: {
    x: number | null;
    y: number | null;
  };
  totalPlayTime?: number;
}

interface PlayersManagerProps {
  squadPlayersList?: string[];
  newPlayerName?: string;
  onAddPlayer?: () => void;
  onDeletePlayer?: (player: string) => void;
  onNewPlayerNameChange?: (value: string) => void;
  players?: Player[];
  onPlayersChange?: (players: Player[]) => void;
}

export default function PlayersManager({
  squadPlayersList,
  newPlayerName = '',
  onAddPlayer,
  onDeletePlayer,
  onNewPlayerNameChange,
  players,
  onPlayersChange
}: PlayersManagerProps): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  const isUsingStringList = squadPlayersList !== undefined;

  const handleAddPlayer = () => {
    if (!onPlayersChange || !players) return;
    const trimmedName = inputValue.trim();
    if (trimmedName === '') return;
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: trimmedName,
      isOnField: false,
      isGoalkeeper: false,
      isStartingPlayer: false,
      position: { x: null, y: null },
      totalPlayTime: 0
    };
    onPlayersChange([...players, newPlayer]);
    setInputValue('');
  };

  const handleDeletePlayer = (playerId: string) => {
    if (!onPlayersChange || !players) return;
    onPlayersChange(players.filter(p => p.id !== playerId));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Players</h3>
      {isUsingStringList ? (
        <>
          <PlayerInput
            value={newPlayerName}
            onChange={(e) => onNewPlayerNameChange?.(e.target.value)}
            onAdd={onAddPlayer}
            placeholder="Enter player name"
          />
          {squadPlayersList && squadPlayersList.length > 0 && (
            <PlayersList squadPlayersList={squadPlayersList} onDeletePlayer={onDeletePlayer} />
          )}
        </>
      ) : (
        <>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 p-2 bg-white/20 text-white placeholder-white/50 border-0 rounded-lg focus:ring-2 focus:ring-blue-400 box-border"
              placeholder="Enter player name"
            />
            <button
              type="button"
              onClick={handleAddPlayer}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>
          {players && players.length > 0 && (
            <PlayersList players={players} onDeletePlayer={handleDeletePlayer} />
          )}
        </>
      )}
    </div>
  );
}