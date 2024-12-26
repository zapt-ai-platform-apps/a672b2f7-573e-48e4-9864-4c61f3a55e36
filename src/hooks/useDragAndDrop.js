import { createSignal } from 'solid-js';
import { playerData, setPlayerData } from '../state';

export default function useDragAndDrop() {
  const [draggingPlayer, setDraggingPlayer] = createSignal(null);
  const [isDragging, setIsDragging] = createSignal(false);
  let pitchRefLocal;

  const handlePointerDown = (e, player) => {
    e.preventDefault();
    setDraggingPlayer(player);
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (isDragging()) {
      const pitchRect = pitchRefLocal.getBoundingClientRect();
      const x = e.clientX - pitchRect.left;
      const y = e.clientY - pitchRect.top;

      setPlayerData(
        playerData().map((p) => {
          if (p.name === draggingPlayer().name) {
            return {
              ...p,
              position: { x, y },
            };
          }
          return p;
        })
      );
    }
  };

  const handlePointerUp = () => {
    if (isDragging()) {
      setIsDragging(false);
      setDraggingPlayer(null);
    }
  };

  function init(pitchRef) {
    pitchRefLocal = pitchRef;
    if (pitchRefLocal) {
      pitchRefLocal.addEventListener('pointermove', handlePointerMove);
      pitchRefLocal.addEventListener('pointerup', handlePointerUp);
      pitchRefLocal.addEventListener('pointercancel', handlePointerUp);
      pitchRefLocal.addEventListener('pointerleave', handlePointerUp);
    }
  }

  function cleanup() {
    if (pitchRefLocal) {
      pitchRefLocal.removeEventListener('pointermove', handlePointerMove);
      pitchRefLocal.removeEventListener('pointerup', handlePointerUp);
      pitchRefLocal.removeEventListener('pointercancel', handlePointerUp);
      pitchRefLocal.removeEventListener('pointerleave', handlePointerUp);
    }
  }

  return {
    handlePointerDown,
    init,
    cleanup,
  };
}