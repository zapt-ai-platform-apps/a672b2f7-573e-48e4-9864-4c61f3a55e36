import React from 'react';
import { Player } from '../../../types/GameTypes';

interface PlayersSectionProps {
  title: string;
  players: Player[];
  isRunning: boolean;
  timerControls: any;
}

const PlayersSection: React.FC<PlayersSectionProps> = ({
  title,
  players,
  isRunning,
  timerControls
}) => {
  // Calculate and format play time for display
  const formatPlayTime = (player: Player): string => {
    const totalSeconds = player.totalPlayTime || 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
      {players.length === 0 ? (
        <p className="text-gray-300 text-center py-4">No players in this section</p>
      ) : (
        <ul className="space-y-2">
          {players.map((player) => (
            <li 
              key={player.id} 
              className="bg-white/10 rounded-lg p-3 flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white font-bold ${player.isGoalkeeper ? 'bg-yellow-500' : 'bg-blue-600'}`}>
                  {player.isGoalkeeper ? 'GK' : (player.number || '')}
                </div>
                <span className="text-white font-medium">{player.name}</span>
              </div>
              <div className="text-gray-300 text-sm">
                {formatPlayTime(player)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayersSection;