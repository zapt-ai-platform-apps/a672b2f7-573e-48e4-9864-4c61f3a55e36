import React, { useRef, useEffect } from 'react';
import Pitch from './Pitch';
import Player from './Player';
import useDragAndDrop from '../hooks/useDragAndDrop';
import { Player as PlayerType } from '@/types/GameTypes';
import { assignInitialPositions } from '../utils/assignInitialPositions';

interface PitchVisualizationProps {
  players: PlayerType[];
  'data-testid'?: string;
}

/**
 * Component to visualize players on a pitch with drag and drop functionality
 */
const PitchVisualization: React.FC<PitchVisualizationProps> = ({ 
  players, 
  'data-testid': dataTestId = 'pitch-visualization'
}) => {
  const pitchRef = useRef<HTMLDivElement>(null);
  const { handlePointerDown, init } = useDragAndDrop();
  
  // Initialize drag and drop functionality
  useEffect(() => {
    if (pitchRef.current) {
      const cleanupFn = init(pitchRef.current);
      return cleanupFn;
    }
  }, [init]);
  
  // Ensure players have valid positions
  const playersWithPositions = assignInitialPositions(players);
  
  // Only render players that are on the field
  const onFieldPlayers = playersWithPositions.filter(player => player.isOnField);
  
  return (
    <div className="relative" ref={pitchRef} data-testid={dataTestId}>
      <Pitch>
        {onFieldPlayers.map((player) => (
          <Player
            key={player.id}
            player={player}
            onPointerDown={(e) => handlePointerDown(e, player.id)}
            data-testid={`player-on-field-${player.id}`}
            data-player-id={player.id}
          />
        ))}
      </Pitch>
    </div>
  );
};

export default PitchVisualization;