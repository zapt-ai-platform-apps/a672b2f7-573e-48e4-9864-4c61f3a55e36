import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSquadPlayerCount, formatPlayersForDisplay } from '../utils/squadUtils';

interface SquadCardProps {
  squad: {
    id: number;
    name: string;
    players: any;
    createdAt?: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SquadCard({ squad, onEdit, onDelete }: SquadCardProps): JSX.Element {
  const navigate = useNavigate();
  const playerCount = getSquadPlayerCount(squad);
  const formattedPlayers = formatPlayersForDisplay(squad.players);

  const handleUseSquad = () => {
    navigate('/game-setup', { state: { squad } });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white mb-2">{squad.name}</h3>
        <div className="bg-blue-500/30 text-blue-100 px-2 py-1 rounded-full text-xs font-medium">
          {playerCount} {playerCount === 1 ? 'player' : 'players'}
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 text-sm line-clamp-2" title={formattedPlayers}>
        {formattedPlayers || 'No players added yet'}
      </p>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="space-x-2">
          <button 
            className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={() => onEdit(squad.id)}
          >
            Edit
          </button>
          <button 
            className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors cursor-pointer"
            onClick={() => onDelete(squad.id)}
          >
            Delete
          </button>
        </div>
        
        <button 
          className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors cursor-pointer"
          onClick={handleUseSquad}
        >
          Use Squad
        </button>
      </div>
    </div>
  );
}