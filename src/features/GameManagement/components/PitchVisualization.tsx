import React, { useEffect, useRef } from 'react';
import { Player } from '../../../types/GameTypes';
import Pitch from './Pitch';
import useDragAndDrop from '../hooks/useDragAndDrop';
import { assignInitialPositions } from '../utils/assignInitialPositions';

interface PitchVisualizationProps {
  players: Player[];
  'data-testid'?: string;
}

const PitchVisualization: React.FC<PitchVisualizationProps> = ({ 
  players,
  'data-testid': testId 
}) => {
  const pitchRef = useRef<HTMLDivElement>(null);
  const { init, handlePointerDown } = useDragAndDrop();

  // Initialize drag and drop functionality
  useEffect(() => {
    if (pitchRef.current) {
      const cleanup = init(pitchRef.current);
      return cleanup;
    }
  }, [init]);

  // Assign initial positions to players
  useEffect(() => {
    if (players) {
      assignInitialPositions(players);
    }
  }, [players]);

  return (
    <div className="w-full h-full relative" data-testid={testId}>
      <div ref={pitchRef} className="pitch w-full h-full bg-green-800 relative rounded-lg overflow-hidden">
        <Pitch />
        {players.map(player => (
          <div
            key={player.id}
            data-player-id={player.id}
            className={`absolute w-12 h-12 flex items-center justify-center rounded-full cursor-move 
                ${player.isGoalkeeper ? 'bg-yellow-500' : 'bg-blue-600'} 
                ${player.status === 'injured' ? 'opacity-50' : ''}
                shadow-md transform transition-transform`}
            style={{
              left: `${player.position.x}%`,
              top: `${player.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onPointerDown={(e) => handlePointerDown(e.nativeEvent, player.id)}
          >
            <span className="text-white font-bold">{player.name.charAt(0)}</span>
            <span className="sr-only">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchVisualization;