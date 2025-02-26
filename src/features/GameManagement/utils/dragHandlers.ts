import { DragState } from '../hooks/useDragAndDrop';

// Find the closest draggable player element
function findDraggableElement(element: Element | null): HTMLElement | null {
  if (!element) return null;
  
  // If this element has a data-player-id, it's what we want
  if (element.getAttribute('data-player-id')) {
    return element as HTMLElement;
  }
  
  // Check if any parent has data-player-id
  let current = element.parentElement;
  while (current) {
    if (current.getAttribute('data-player-id')) {
      return current as HTMLElement;
    }
    current = current.parentElement;
  }
  
  return null;
}

export function pointerDown(e: PointerEvent, dragState: DragState, playerId?: string): void {
  const target = findDraggableElement(e.target as Element);
  
  if (target) {
    // Set pointer capture to ensure we get all events
    target.setPointerCapture(e.pointerId);
    
    // Store the offset within the element where the pointer was pressed
    const rect = target.getBoundingClientRect();
    dragState.offsetX = e.clientX - rect.left;
    dragState.offsetY = e.clientY - rect.top;
    
    // Store which element we're dragging
    dragState.target = target;
    dragState.dragging = true;
    dragState.playerId = playerId || target.getAttribute('data-player-id') || undefined;
    
    // Add a class to indicate dragging
    target.classList.add('dragging');
    
    console.log('Drag started:', dragState.playerId);
  }
}

export function pointerMove(e: PointerEvent, dragState: DragState): void {
  if (dragState.dragging && dragState.target) {
    // Get the parent pitch element
    const pitchElement = dragState.target.closest('.pitch') as HTMLElement;
    
    if (pitchElement) {
      const pitchRect = pitchElement.getBoundingClientRect();
      
      // Calculate position relative to the pitch, accounting for the offset within the element
      let newX = e.clientX - pitchRect.left - dragState.offsetX;
      let newY = e.clientY - pitchRect.top - dragState.offsetY;
      
      // Convert to percentages for responsive positioning
      const percentX = (newX / pitchRect.width) * 100;
      const percentY = (newY / pitchRect.height) * 100;
      
      // Clamp to keep within the pitch
      const clampedX = Math.max(0, Math.min(100, percentX));
      const clampedY = Math.max(0, Math.min(100, percentY));
      
      // Update the position
      dragState.target.style.left = `${clampedX}%`;
      dragState.target.style.top = `${clampedY}%`;
      
      // Store the position as a data attribute to retrieve later
      dragState.target.dataset.positionX = clampedX.toString();
      dragState.target.dataset.positionY = clampedY.toString();
      
      // Dispatch a custom event to notify about position changes
      const positionUpdateEvent = new CustomEvent('playerPositionUpdate', {
        detail: {
          playerId: dragState.playerId,
          x: clampedX,
          y: clampedY
        },
        bubbles: true
      });
      
      pitchElement.dispatchEvent(positionUpdateEvent);
    }
  }
}

export function pointerUp(e: PointerEvent, dragState: DragState): void {
  if (dragState.dragging && dragState.target) {
    // Release pointer capture
    dragState.target.releasePointerCapture(e.pointerId);
    
    // Remove dragging indicator
    dragState.target.classList.remove('dragging');
    
    // Get final position
    const finalX = parseFloat(dragState.target.dataset.positionX || '0');
    const finalY = parseFloat(dragState.target.dataset.positionY || '0');
    
    // Create a final position update event
    const pitchElement = dragState.target.closest('.pitch') as HTMLElement;
    if (pitchElement) {
      const finalPositionEvent = new CustomEvent('playerPositionFinal', {
        detail: {
          playerId: dragState.playerId,
          x: finalX,
          y: finalY
        },
        bubbles: true
      });
      
      pitchElement.dispatchEvent(finalPositionEvent);
      
      console.log('Drag ended. Final position:', { playerId: dragState.playerId, x: finalX, y: finalY });
    }
    
    // Reset drag state
    dragState.dragging = false;
    dragState.target = null;
    dragState.playerId = undefined;
  }
}