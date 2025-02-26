import { useCallback, useRef } from 'react';
import { pointerDown, pointerMove, pointerUp } from '../utils/dragHandlers';
import * as Sentry from '@sentry/browser';

export interface DragState {
  dragging: boolean;
  target: HTMLElement | null;
  offsetX: number;
  offsetY: number;
  playerId?: string;
}

/**
 * Hook for managing player drag and drop on the pitch
 * @returns Object with handlePointerDown and init functions
 */
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
    try {
      // Ensure we're finding the correct player element and working with it
      if (playerId) {
        const playerElement = document.querySelector(`[data-player-id="${playerId}"]`) as HTMLElement;
        if (playerElement) {
          console.log('Player element found for drag, ID:', playerId);
          e.preventDefault(); // Prevent default to ensure drag works properly
          e.stopPropagation(); // Stop event from bubbling up
          pointerDown(e, dragStateRef.current, playerId);
        } else {
          console.error('Player element not found for ID:', playerId);
        }
      } else {
        // Handle case when no playerId is provided (clicked on the pitch itself)
        pointerDown(e, dragStateRef.current);
      }
    } catch (error) {
      console.error('Error in handlePointerDown:', error);
      Sentry.captureException(error);
    }
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent): void => {
    try {
      if (dragStateRef.current.dragging && dragStateRef.current.target) {
        e.preventDefault(); // Prevent default to ensure drag works properly
        pointerMove(e, dragStateRef.current);
      }
    } catch (error) {
      console.error('Error in handlePointerMove:', error);
      Sentry.captureException(error);
    }
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent): void => {
    try {
      if (dragStateRef.current.dragging) {
        e.preventDefault(); // Prevent default to ensure drag works properly
        pointerUp(e, dragStateRef.current);
        
        // Log for debugging
        console.log('Drag ended, updating player position:', dragStateRef.current.playerId);
      }
    } catch (error) {
      console.error('Error in handlePointerUp:', error);
      Sentry.captureException(error);
    }
  }, []);

  const init = useCallback((pitchElement: HTMLElement) => {
    console.log('Initializing drag and drop on pitch element');
    
    try {
      // Add event listeners to the document to catch events even if they leave the pitch
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      
      // Set pointer capture on pointerdown to ensure we get all events
      pitchElement.addEventListener('pointerdown', (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        // Check if we're clicking on a player or a player container
        const playerElement = target.closest('[data-player-id]');
        
        if (playerElement) {
          console.log('Pointer down on player element:', playerElement.getAttribute('data-player-id'));
          playerElement.setPointerCapture(e.pointerId);
        } else if (target) {
          console.log('Pointer down on pitch element');
          target.setPointerCapture(e.pointerId);
        }
      });

      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    } catch (error) {
      console.error('Error initializing drag and drop:', error);
      Sentry.captureException(error);
      // Return an empty cleanup function
      return () => {};
    }
  }, [handlePointerMove, handlePointerUp]);

  return {
    handlePointerDown,
    init
  };
}

export default useDragAndDrop;