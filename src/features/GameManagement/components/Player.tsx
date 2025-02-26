import React from 'react';
import { Player as PlayerType } from '../../../shared/models/player';
import { motion } from 'framer-motion';

interface PlayerProps {
  player: PlayerType;
  onSelect?: (player: PlayerType) => void;
  isActive?: boolean;
  showStatus?: boolean;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>, playerId?: string) => void;
}

const Player: React.FC<PlayerProps> = ({ 
  player, 
  onSelect, 
  isActive = false,
  showStatus = true,
  onPointerDown
}) => {
  const statusColor = player.status === 'playing' 
    ? 'bg-green-500' 
    : player.status === 'substitute' 
      ? 'bg-yellow-500' 
      : 'bg-gray-500';

  // Ensure we're displaying player name as a string, not rendering the position object
  const nameParts = player.name.split(' ');
  const displayName = nameParts.length > 1 
    ? `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.` 
    : player.name;
    
  // Check if this is being used in the pitch view (onPointerDown exists)
  const isPitchView = !!onPointerDown;
    
  return (
    <motion.div 
      className={`rounded-lg p-3 mb-2 cursor-pointer transition-all ${
        isActive ? 'bg-indigo-700 scale-105' : 'bg-indigo-800 hover:bg-indigo-700'
      }`}
      onClick={() => onSelect && onSelect(player)}
      onPointerDown={(e) => onPointerDown && onPointerDown(e, player.id?.toString())}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: isPitchView ? 'absolute' : 'relative',
        left: isPitchView ? player.position?.x : undefined,
        top: isPitchView ? player.position?.y : undefined,
        transform: isPitchView ? 'translate(-50%, -50%)' : undefined,
        backgroundColor: isPitchView ? 'rgba(79, 70, 229, 0.7)' : undefined,
        padding: isPitchView ? '0.5rem' : undefined,
        minWidth: isPitchView ? '80px' : undefined,
        backdropFilter: isPitchView ? 'blur(4px)' : undefined,
        boxShadow: isPitchView ? '0 4px 6px rgba(0, 0, 0, 0.1)' : undefined,
        borderRadius: isPitchView ? '0.5rem' : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        {isPitchView ? (
          <span className="pitch-player-name text-white font-medium">{displayName}</span>
        ) : (
          <span className="player-name text-white font-medium">{displayName}</span>
        )}
        {showStatus && !isPitchView && (
          <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
        )}
      </div>
    </motion.div>
  );
};

export default Player;