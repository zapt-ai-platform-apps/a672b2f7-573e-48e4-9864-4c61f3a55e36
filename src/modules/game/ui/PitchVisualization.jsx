import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/app/context/AppProvider';
import Pitch from './Pitch';
import useDragAndDrop from '@/shared/hooks/useDragAndDrop';
import assignInitialPositions from '@/shared/utils/assignInitialPositions';

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
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
        Player Positions
      </h2>
      <Pitch pitchRef={pitchRef} playerData={playerData} handlePointerDown={handlePointerDown} />
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Drag and drop players to set their positions.
      </p>
    </div>
  );
}

export default PitchVisualization;