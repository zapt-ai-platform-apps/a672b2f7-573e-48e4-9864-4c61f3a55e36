import { useCallback } from 'react';

// Export the interface so it can be imported by other files
export interface DragState {
  isDragging: boolean;
  currentElement: HTMLElement | null;
  offsetX: number;
  offsetY: number;
  parentRect: DOMRect | null;
}

/**
 * Custom hook to handle drag and drop functionality for players on the pitch
 */
const useDragAndDrop = () => {
  // Initialize drag state
  const dragState: DragState = {
    isDragging: false,
    currentElement: null,
    offsetX: 0,
    offsetY: 0,
    parentRect: null
  };

  // Handle the start of a drag operation
  const handlePointerDown = useCallback((e: React.PointerEvent, playerId?: string) => {
    // Find the draggable element
    let target = e.currentTarget as HTMLElement;
    
    // Find the player element if we were given an ID
    if (playerId) {
      const playerElement = document.querySelector(`[data-player-id="${playerId}"]`) as HTMLElement;
      if (playerElement) {
        target = playerElement;
      }
    }
    
    if (!target) return;
    
    // Set pointer capture to keep receiving events
    target.setPointerCapture(e.pointerId);
    
    // Calculate offset from the element's top-left corner
    const rect = target.getBoundingClientRect();
    dragState.offsetX = e.clientX - rect.left;
    dragState.offsetY = e.clientY - rect.top;
    
    // Set up parent container for position calculations
    const parentElement = target.closest('.pitch') as HTMLElement;
    if (parentElement) {
      dragState.parentRect = parentElement.getBoundingClientRect();
    }
    
    // Start dragging
    dragState.isDragging = true;
    dragState.currentElement = target;
    
    // Add move and up listeners
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }, []);

  // Handle movement during drag
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragState.isDragging || !dragState.currentElement || !dragState.parentRect) return;
    
    // Prevent scrolling on touch devices
    e.preventDefault();
    
    // Calculate new position relative to parent
    const parentRect = dragState.parentRect;
    const newX = e.clientX - parentRect.left - dragState.offsetX;
    const newY = e.clientY - parentRect.top - dragState.offsetY;
    
    // Convert to percentages and constrain to parent boundaries
    const percentX = Math.max(0, Math.min(100, (newX / parentRect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (newY / parentRect.height) * 100));
    
    // Position the element
    dragState.currentElement.style.left = `${percentX}%`;
    dragState.currentElement.style.top = `${percentY}%`;
    
    // Dispatch event for real-time update
    const playerIdAttr = dragState.currentElement.getAttribute('data-player-id');
    if (playerIdAttr) {
      const updateEvent = new CustomEvent('playerPositionUpdate', {
        detail: {
          playerId: playerIdAttr,
          x: percentX,
          y: percentY
        }
      });
      dragState.currentElement.closest('.pitch')?.dispatchEvent(updateEvent);
    }
  }, []);

  // Handle the end of a drag operation
  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!dragState.isDragging || !dragState.currentElement || !dragState.parentRect) return;
    
    // Release pointer capture
    dragState.currentElement.releasePointerCapture(e.pointerId);
    
    // Calculate final position
    const parentRect = dragState.parentRect;
    const finalX = e.clientX - parentRect.left - dragState.offsetX;
    const finalY = e.clientY - parentRect.top - dragState.offsetY;
    
    // Convert to percentages and constrain
    const percentX = Math.max(0, Math.min(100, (finalX / parentRect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (finalY / parentRect.height) * 100));
    
    // Dispatch final position event
    const playerIdAttr = dragState.currentElement.getAttribute('data-player-id');
    if (playerIdAttr) {
      const finalEvent = new CustomEvent('playerPositionFinal', {
        detail: {
          playerId: playerIdAttr,
          x: percentX,
          y: percentY
        }
      });
      dragState.currentElement.closest('.pitch')?.dispatchEvent(finalEvent);
    }
    
    // Clean up
    dragState.isDragging = false;
    dragState.currentElement = null;
    dragState.parentRect = null;
    
    // Remove event listeners
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  }, []);

  // Initialize function to set up event listeners
  const init = useCallback((pitchElement: HTMLElement) => {
    // Clean up function to remove event listeners
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return {
    handlePointerDown,
    init
  };
};

export default useDragAndDrop;