import { useCallback } from 'react';
import { pointerDown, pointerMove, pointerUp, DragState } from '../../utils/dragHandlers';

function useDragAndDrop() {
  const dragState: DragState = {
    dragging: false,
    target: null,
    offsetX: 0,
    offsetY: 0
  };

  const handlePointerDown = useCallback((e: PointerEvent): void => {
    pointerDown(e, dragState);
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent): void => {
    pointerMove(e, dragState);
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent): void => {
    pointerUp(e, dragState);
  }, []);

  const init = useCallback((pitchElement: HTMLElement) => {
    pitchElement.addEventListener('pointermove', handlePointerMove);
    pitchElement.addEventListener('pointerup', handlePointerUp);
    return () => {
      pitchElement.removeEventListener('pointermove', handlePointerMove);
      pitchElement.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return {
    handlePointerDown,
    init
  };
}

export default useDragAndDrop;