import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/app/context/AppProvider';
import Pitch from './Pitch';
import useDragAndDrop from '@/modules/game/hooks/useDragAndDrop';
import assignInitialPositions from '@/modules/game/utils/assignInitialPositions';

function PitchVisualization() {
  const { playerData } = useAppContext();
  const pitchRef = useRef(null);
  const { handlePointerDown, init, cleanup } = useDragAndDrop();

  useEffect(() => {
    if (pitchRef.current) {
      assignInitialPositions(pitchRef.current);
    }
  }, [playerData]);

  useEffect(() => {
    if (pitchRef.current) {
      init(pitchRef.current);
    }
    return () => {
      cleanup();
    };
  }, [init, cleanup]);

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-600 dark:text-green-400">
        Player Positions
      </h2>
      <Pitch pitchRef={pitchRef} playerData={playerData} handlePointerDown={handlePointerDown} />
      <p className="mt-3 text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">
        Drag and drop players to set their positions.
      </p>
    </div>
  );
}

export default PitchVisualization;