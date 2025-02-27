import React from 'react';
import PlayerCard from './PlayerCard';
import { Player } from '../../../../types/GameTypes';

interface StartingLineupProps {
  players: Player[];
  onTogglePlayer: (playerId: string) => void;
}

/**
 * Component for selecting the starting lineup players
 */
const StartingLineup = ({ players, onTogglePlayer }: StartingLineupProps): JSX.Element => {
  // Separate players into starting and bench players
  const startingPlayers = players.filter(player => player.isStartingPlayer);
  const benchPlayers = players.filter(player => !player.isStartingPlayer);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-3">
          Starting Players ({startingPlayers.length})
        </h3>
        {startingPlayers.length === 0 ? (
          <p className="text-gray-300 italic">No players selected for starting lineup yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {startingPlayers.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                selected={true}
                onClick={() => onTogglePlayer(player.id)}
                data-testid={`starting-player-${player.id}`}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-3">
          Bench Players ({benchPlayers.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benchPlayers.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              selected={false}
              onClick={() => onTogglePlayer(player.id)}
              data-testid={`bench-player-${player.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartingLineup;