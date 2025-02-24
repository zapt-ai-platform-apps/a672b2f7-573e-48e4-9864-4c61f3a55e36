import React, { useState } from 'react';
import PlayerInput from './PlayerInput';
import PlayersList from './PlayersList';

export type Player = {
  id: string;
  name: string;
};

interface PlayersManagerProps {
  players: Player[];
  onPlayersChange: (players: Player[]) => void;
}

export default function PlayersManager({ players, onPlayersChange }: PlayersManagerProps): JSX.Element {
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAddPlayer = (): void => {
    if (!newPlayerName.trim()) {
      setError('Player name cannot be empty');
      return;
    }

    if (players.some(player => player.name.toLowerCase() === newPlayerName.toLowerCase())) {
      setError('A player with this name already exists');
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName
    };

    onPlayersChange([...players, newPlayer]);
    setNewPlayerName('');
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  const handleRemovePlayer = (id: string): void => {
    onPlayersChange(players.filter(player => player.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
        <h3 className="text-lg font-medium mb-3 text-white">Add Players</h3>
        <div className="flex space-x-2">
          <PlayerInput
            value={newPlayerName}
            onChange={(e) => {
              setNewPlayerName(e.target.value);
              if (error) setError(null);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter player name"
            className="flex-grow box-border bg-white/20 text-white placeholder-white/50 border-0 focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddPlayer}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Add
          </button>
        </div>
        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
      </div>

      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
        <h3 className="text-lg font-medium mb-3 text-white">Player List</h3>
        <PlayersList players={players} onRemove={handleRemovePlayer} />
      </div>
    </div>
  );
}