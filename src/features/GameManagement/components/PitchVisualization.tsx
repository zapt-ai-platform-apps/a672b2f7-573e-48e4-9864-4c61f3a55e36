import React, { useEffect, useRef } from 'react';
import type { Player } from '../../../types/GameTypes';
import Pitch from './Pitch';
import useDragAndDrop from '../hooks/useDragAndDrop';
import { assignInitialPositions } from '../utils/assignInitialPositions';

interface PitchVisualizationProps {
  players: Player[];
}

function PitchVisualization({ players }: PitchVisualizationProps): JSX.Element {
  const pitchRef = useRef<HTMLDivElement>(null);
  const { handlePointerDown, init } = useDragAndDrop();

  // Process players to ensure valid position objects
  const playersWithValidPositions = players.map(player => ({
    ...player,
    position: typeof player.position === 'object' && player.position !== null
      ? {
          x: typeof player.position.x === 'number' ? player.position.x : 0,
          y: typeof player.position.y === 'number' ? player.position.y : 0
        }
      : { x: 0, y: 0 }
  }));

  useEffect(() => {
    // Call assignInitialPositions with the player array
    assignInitialPositions(playersWithValidPositions);
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

  // Updated to pass the player ID to the pointer down handler
  const handlePointerDownWrapper = (e: React.PointerEvent<Element>, playerId?: string) => {
    console.log('Pointer down on player:', playerId);
    handlePointerDown(e.nativeEvent, playerId);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Players on the Pitch
      </h2>
      <Pitch 
        pitchRef={pitchRef} 
        playerData={playersWithValidPositions} 
        handlePointerDown={handlePointerDownWrapper}
        players={playersWithValidPositions} 
      />
      <p className="mt-4 text-white opacity-80">
        Drag and drop players to adjust their positions on the field.
      </p>
    </div>
  );
}

export default PitchVisualization;