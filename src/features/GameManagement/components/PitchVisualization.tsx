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

  // Updated to use a more generic type for pointer events
  const handlePointerDownWrapper = (e: React.PointerEvent<Element>, playerId?: string) => {
    handlePointerDown(e.nativeEvent);
  };

  // Ensure players have numeric position values before passing to Pitch
  const playersWithValidPositions = players.map(player => ({
    ...player,
    position: {
      x: typeof player.position.x === 'number' ? player.position.x : 0,
      y: typeof player.position.y === 'number' ? player.position.y : 0
    }
  }));

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
        Player Positions
      </h2>
      <Pitch 
        pitchRef={pitchRef} 
        playerData={playersWithValidPositions} 
        handlePointerDown={handlePointerDownWrapper}
        players={playersWithValidPositions} 
      />
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Drag and drop players to set their positions.
      </p>
    </div>
  );
}

export default PitchVisualization;