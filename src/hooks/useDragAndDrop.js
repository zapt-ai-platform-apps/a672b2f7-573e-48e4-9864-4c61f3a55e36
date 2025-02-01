import { useCallback } from 'react';
import { useStateContext } from '../state';

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