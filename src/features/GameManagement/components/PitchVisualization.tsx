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
        <Pitch 
          pitchRef={pitchRef} 
          playerData={players} 
          players={players} 
          handlePointerDown={handlePointerDown} 
        />
        {/* Removed duplicate player rendering here */}
      </div>
    </div>
  );
};

export default PitchVisualization;