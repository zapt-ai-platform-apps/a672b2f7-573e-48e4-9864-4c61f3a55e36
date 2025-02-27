import React from 'react';
import parsePlayers from '../../../utils/parsePlayers';

interface SquadPlayersProps {
  players: string;
  setPlayers: (players: string) => void;
}

export default function SquadPlayers({ players, setPlayers }: SquadPlayersProps): JSX.Element {
  const handlePlayersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlayers(e.target.value);
  };

  // Get parsed player count for display
  const playerCount = players ? parsePlayers(players).length : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="players" className="block text-white font-medium">
          Players
        </label>
        <span className="text-sm text-blue-200">
          {playerCount} {playerCount === 1 ? 'player' : 'players'}
        </span>
      </div>
      <textarea
        id="players"
        name="players"
        value={players}
        onChange={handlePlayersChange}
        placeholder="Enter player names separated by commas or line breaks"
        className="w-full p-3 bg-white/10 text-white rounded-lg border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none box-border"
        rows={6}
      />
      <p className="mt-2 text-sm text-gray-300">
        Enter each player name on a new line or separated by commas
      </p>
    </div>
  );
}