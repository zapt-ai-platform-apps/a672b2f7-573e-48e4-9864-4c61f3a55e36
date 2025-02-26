import { useCallback, useRef } from 'react';
import { pointerDown, pointerMove, pointerUp } from '../utils/dragHandlers';

export interface DragState {
  dragging: boolean;
  target: HTMLElement | null;
  offsetX: number;
  offsetY: number;
  playerId?: string;
}

function useDragAndDrop() {
  // Use a ref to maintain state between renders but not trigger re-renders
  const dragStateRef = useRef<DragState>({
    dragging: false,
    target: null,
    offsetX: 0,
    offsetY: 0,
    playerId: undefined
  });

  const handlePointerDown = useCallback((e: PointerEvent, playerId?: string): void => {
    pointerDown(e, dragStateRef.current, playerId);
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent): void => {
    if (dragStateRef.current.dragging && dragStateRef.current.target) {
      pointerMove(e, dragStateRef.current);
    }
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent): void => {
    if (dragStateRef.current.dragging) {
      pointerUp(e, dragStateRef.current);
    }
  }, []);

  const init = useCallback((pitchElement: HTMLElement) => {
    // Add event listeners to the document to catch events even if they leave the pitch
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    
    // Set pointer capture on pointerdown to ensure we get all events
    pitchElement.addEventListener('pointerdown', (e: PointerEvent) => {
      if (e.target) {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }
    });

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return {
    handlePointerDown,
    init
  };
}

export default useDragAndDrop;