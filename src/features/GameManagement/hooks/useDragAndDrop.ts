import { useCallback } from 'react';
import * as Sentry from '@sentry/browser';

/**
 * Type definition for drag state
 */
export interface DragState {
  dragging: boolean;
  target: HTMLElement | null;
  offsetX: number;
  offsetY: number;
  playerId?: string;
}

/**
 * Custom hook for handling drag and drop functionality
 */
const useDragAndDrop = () => {
  let activePlayer: HTMLElement | null = null;
  let initialX = 0;
  let initialY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let pitchRect: DOMRect | null = null;

  /**
   * Handle pointer move events
   */
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!activePlayer || !pitchRect) return;
    
    // Calculate position within pitch
    const x = ((e.clientX - pitchRect.left - offsetX) / pitchRect.width) * 100;
    const y = ((e.clientY - pitchRect.top - offsetY) / pitchRect.height) * 100;
    
    // Constrain to pitch bounds
    const constrainedX = Math.max(0, Math.min(100, x));
    const constrainedY = Math.max(0, Math.min(100, y));
    
    // Update player position
    activePlayer.style.left = `${constrainedX}%`;
    activePlayer.style.top = `${constrainedY}%`;
    
    // Dispatch event for real-time position updates (optional)
    const positionEvent = new CustomEvent('playerPositionUpdate', {
      detail: {
        playerId: activePlayer.getAttribute('data-player-id'),
        x: constrainedX,
        y: constrainedY
      }
    });
    
    pitchRect.ownerDocument.dispatchEvent(positionEvent);
  }, []);

  /**
   * Handle pointer up events
   */
  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!activePlayer || !pitchRect) return;
    
    const playerId = activePlayer.getAttribute('data-player-id');
    console.log(`Drag ended for player ${playerId}`);
    
    // Calculate final position
    // Get position as percentage of pitch size
    const x = ((e.clientX - pitchRect.left - offsetX) / pitchRect.width) * 100;
    const y = ((e.clientY - pitchRect.top - offsetY) / pitchRect.height) * 100;
    
    // Constrain to pitch bounds
    const constrainedX = Math.max(0, Math.min(100, x));
    const constrainedY = Math.max(0, Math.min(100, y));
    
    // Dispatch custom event for position update
    const positionEvent = new CustomEvent('playerPositionFinal', {
      detail: {
        playerId,
        x: constrainedX,
        y: constrainedY
      }
    });
    
    pitchRect.ownerDocument.dispatchEvent(positionEvent);
    
    // Update player position
    activePlayer.style.left = `${constrainedX}%`;
    activePlayer.style.top = `${constrainedY}%`;
    
    // Reset active player reference
    activePlayer = null;
    
    // Remove move and up listeners to clean up
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  }, []);

  /**
   * Initialize drag events for the pitch element
   */
  const init = useCallback((pitchElement: HTMLElement) => {
    if (!pitchElement) return () => {}; // Return empty cleanup if no element
    
    // Return cleanup function
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);
  
  /**
   * Handle the start of a drag operation
   */
  const handlePointerDown = useCallback((e: React.PointerEvent, playerId?: string) => {
    try {
      // Find the draggable element
      let target = e.currentTarget as HTMLElement;
      
      // Get the parent node that has the data-player-id attribute
      while (target && !target.hasAttribute('data-player-id')) {
        const parent = target.parentElement;
        if (!parent) break;
        target = parent;
      }
      
      if (!target) {
        console.error('No draggable parent found');
        return;
      }
      
      // Prevent default behavior
      e.preventDefault();
      
      // Set active element
      activePlayer = target;
      
      // Store initial event position
      initialX = e.clientX;
      initialY = e.clientY;
      
      // Calculate offset for centering
      const bounds = target.getBoundingClientRect();
      offsetX = initialX - bounds.left - (bounds.width / 2);
      offsetY = initialY - bounds.top - (bounds.height / 2);
      
      // Store pitch bounds
      const pitch = target.closest('.pitch') as HTMLElement;
      if (pitch) {
        pitchRect = pitch.getBoundingClientRect();
      }
      
      // Add event listeners for move and up events
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    } catch (error) {
      console.error('Error starting drag:', error);
      Sentry.captureException(error);
    }
  }, [handlePointerMove, handlePointerUp]);
  
  return {
    handlePointerDown,
    init
  };
};

export default useDragAndDrop;