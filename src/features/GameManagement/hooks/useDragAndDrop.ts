import { useCallback, useState } from 'react';
import { useStateContext } from '../../../state';

export default function useDragAndDrop() {
  const { playerData, setPlayerData } = useStateContext();
  const [draggingPlayer, setDraggingPlayer] = useState<any>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>, player: any) => {
    e.preventDefault();
    setDraggingPlayer(player);
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!draggingPlayer) return;
    
    const target = e.currentTarget as HTMLElement;
    const pitchRect = target.getBoundingClientRect();
    const x = e.clientX - pitchRect.left;
    const y = e.clientY - pitchRect.top;

    setPlayerData((prev: any[]) => prev.map(p => 
      p.id === draggingPlayer.id 
        ? { ...p, position: { x, y } }
        : p
    ));
  }, [draggingPlayer, setPlayerData]);

  const handlePointerUp = useCallback(() => {
    setDraggingPlayer(null);
  }, []);

  const init = useCallback((pitchElement: HTMLElement | null) => {
    if (!pitchElement) return;
    
    pitchElement.addEventListener('pointermove', handlePointerMove);
    pitchElement.addEventListener('pointerup', handlePointerUp);
    pitchElement.addEventListener('pointerleave', handlePointerUp);

    return () => {
      pitchElement.removeEventListener('pointermove', handlePointerMove);
      pitchElement.removeEventListener('pointerup', handlePointerUp);
      pitchElement.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return { handlePointerDown, init };
}