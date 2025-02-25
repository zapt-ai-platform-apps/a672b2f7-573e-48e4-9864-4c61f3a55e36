import React, { useEffect, useRef } from 'react';
import type { Player } from '../../../types/GameTypes';
import Pitch from './Pitch';
import useDragAndDrop from '../hooks/useDragAndDrop';
import assignInitialPositions from '../utils/assignInitialPositions';

interface PitchVisualizationProps {
  players: Player[];
}

function PitchVisualization({ players }: PitchVisualizationProps): JSX.Element {
  const pitchRef = useRef<HTMLDivElement>(null);
  const { handlePointerDown, init } = useDragAndDrop();

  useEffect(() => {
    if (pitchRef.current) {
      assignInitialPositions(pitchRef.current);
    }
  }, [players]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (pitchRef.current) {
      cleanup = init(pitchRef.current);
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, [init]);

  // Updated to accept playerId parameter
  const handlePointerDownWrapper = (e: React.PointerEvent<HTMLDivElement>, playerId?: string) => {
    handlePointerDown(e.nativeEvent, playerId);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
        Player Positions
      </h2>
      <Pitch 
        pitchRef={pitchRef} 
        playerData={players} 
        handlePointerDown={handlePointerDownWrapper} 
      />
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Drag and drop players to set their positions.
      </p>
    </div>
  );
}

export default PitchVisualization;