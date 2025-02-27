import React from 'react';
import { Player } from '../../../types/GameTypes';

interface PlayerPlaytimesProps {
  activePlayers: Player[];
  benchPlayers: Player[];
  playerData: Player[];
  includeGKPlaytime: boolean;
  getTotalPlayTime: (player: Player) => number;
  formatTime: (seconds: number) => string;
}

const PlayerPlaytimes: React.FC<PlayerPlaytimesProps> = ({
  activePlayers,
  benchPlayers,
  playerData,
  includeGKPlaytime,
  getTotalPlayTime,
  formatTime
}) => {
  // Sort active and bench players by playtime (descending)
  const sortedActivePlayers = [...activePlayers].sort(
    (a, b) => getTotalPlayTime(b) - getTotalPlayTime(a)
  );
  
  const sortedBenchPlayers = [...benchPlayers].sort(
    (a, b) => getTotalPlayTime(b) - getTotalPlayTime(a)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Player Play Times</h2>
      
      {/* Active Players */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-blue-200">On Field</h3>
        <div className="space-y-2">
          {sortedActivePlayers.length > 0 ? (
            sortedActivePlayers.map(player => (
              <div 
                key={player.id} 
                className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg"
              >
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-3 ${
                      player.isGoalkeeper ? 'bg-yellow-400' : 'bg-green-400'
                    }`}
                  ></div>
                  <span className="font-medium">{player.name}</span>
                  {player.isGoalkeeper && (
                    <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">GK</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-lg font-mono">
                    {formatTime(getTotalPlayTime(player))}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300 italic">No active players</p>
          )}
        </div>
      </div>
      
      {/* Bench Players */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-blue-200">On Bench</h3>
        <div className="space-y-2">
          {sortedBenchPlayers.length > 0 ? (
            sortedBenchPlayers.map(player => (
              <div 
                key={player.id} 
                className="flex justify-between items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg"
              >
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-3 ${
                      player.isGoalkeeper ? 'bg-yellow-400/50' : 'bg-blue-400/50'
                    }`}
                  ></div>
                  <span className="font-medium">{player.name}</span>
                  {player.isGoalkeeper && (
                    <span className="ml-2 text-xs bg-yellow-400/50 text-white px-2 py-0.5 rounded-full">GK</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-lg font-mono">
                    {formatTime(getTotalPlayTime(player))}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300 italic">No bench players</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerPlaytimes;