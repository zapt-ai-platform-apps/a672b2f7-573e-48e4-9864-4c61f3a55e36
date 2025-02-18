import { useCallback } from 'react';
import { useStateContext } from '../../../state';

export default function useDragAndDrop() {
  const { playerData, setPlayerData } = useStateContext();
  const [draggingPlayer, setDraggingPlayer] = useState(null);

  const handlePointerDown = useCallback((e, player) => {
    e.preventDefault();
    setDraggingPlayer(player);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!draggingPlayer) return;
    
    const pitchRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - pitchRect.left;
    const y = e.clientY - pitchRect.top;

    setPlayerData(prev => prev.map(p => 
      p.id === draggingPlayer.id 
        ? { ...p, position: { x, y } }
        : p
    ));
  }, [draggingPlayer]);

  const handlePointerUp = useCallback(() => {
    setDraggingPlayer(null);
  }, []);

  const init = useCallback((pitchElement) => {
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