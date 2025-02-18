import { useCallback } from 'react';
import { useStateContext } from '../../../state';

/**
 * Custom hook to add drag and drop functionality for moving players on the pitch.
 *
 * Returns event handlers and functions to initialize and clean up pointer events.
 *
 * @returns {Object} An object containing:
 *  - handlePointerDown: Function to handle pointer down events.
 *  - init: Function to initialize drag and drop on a given pitch element.
 *  - cleanup: Function to remove event listeners.
 */
export default function useDragAndDrop() {
  let pitchRefLocal = null;
  const { playerData, setPlayerData } = useStateContext();

  const handlePointerDown = useCallback((e, player) => {
    e.preventDefault();
    window._draggingPlayer = player;
    window._isDragging = true;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (window._isDragging) {
      const pitchRect = pitchRefLocal.getBoundingClientRect();
      const x = e.clientX - pitchRect.left;
      const y = e.clientY - pitchRect.top;
      setPlayerData(
        playerData.map((p) => {
          if (p.name === window._draggingPlayer.name) {
            return {
              ...p,
              position: { x, y }
            };
          }
          return p;
        })
      );
    }
  }, [playerData, setPlayerData]);

  const handlePointerUp = useCallback(() => {
    if (window._isDragging) {
      window._isDragging = false;
      window._draggingPlayer = null;
    }
  }, []);

  const init = useCallback((pitchRef) => {
    pitchRefLocal = pitchRef;
    if (pitchRefLocal) {
      pitchRefLocal.addEventListener('pointermove', handlePointerMove);
      pitchRefLocal.addEventListener('pointerup', handlePointerUp);
      pitchRefLocal.addEventListener('pointercancel', handlePointerUp);
      pitchRefLocal.addEventListener('pointerleave', handlePointerUp);
    }
  }, [handlePointerMove, handlePointerUp]);

  const cleanup = useCallback(() => {
    if (pitchRefLocal) {
      pitchRefLocal.removeEventListener('pointermove', handlePointerMove);
      pitchRefLocal.removeEventListener('pointerup', handlePointerUp);
      pitchRefLocal.removeEventListener('pointercancel', handlePointerUp);
      pitchRefLocal.removeEventListener('pointerleave', handlePointerUp);
    }
  }, [handlePointerMove, handlePointerUp]);

  return {
    handlePointerDown,
    init,
    cleanup
  };
}