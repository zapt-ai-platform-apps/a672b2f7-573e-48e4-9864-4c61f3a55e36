import { DragState } from '../hooks/useDragAndDrop';

export function pointerDown(e: PointerEvent, dragState: DragState, playerId?: string): void {
  // Identify the draggable target - should be a player element with data-player-id
  let target = e.target as HTMLElement;
  
  // If we clicked on a child element, find the parent with data-player-id
  while (target && !target.hasAttribute('data-player-id')) {
    target = target.parentElement as HTMLElement;
    if (!target || target.classList.contains('pitch')) break;
  }

  if (!target || !target.hasAttribute('data-player-id')) {
    console.log('No draggable player element found');
    return;
  }

  // We found a draggable player element
  const targetPlayerId = target.getAttribute('data-player-id');
  
  // If an explicit playerId was provided, ensure it matches the target
  if (playerId && targetPlayerId !== playerId) {
    console.log('Target player ID does not match provided player ID');
    return;
  }

  // Set up the drag state
  const rect = target.getBoundingClientRect();
  const pitchElement = target.closest('.pitch') as HTMLElement;
  
  if (!pitchElement) {
    console.error('Pitch element not found');
    return;
  }
  
  const pitchRect = pitchElement.getBoundingClientRect();
  
  // Calculate offset from the click point to the element's top-left
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  
  // Store the state
  dragState.dragging = true;
  dragState.target = target;
  dragState.offsetX = offsetX;
  dragState.offsetY = offsetY;
  dragState.playerId = targetPlayerId || undefined;
  
  console.log('Started dragging player:', targetPlayerId);
  
  // Ensure pointer capture for consistent event handling
  target.setPointerCapture(e.pointerId);
}

export function pointerMove(e: PointerEvent, dragState: DragState): void {
  if (!dragState.dragging || !dragState.target) return;
  
  const target = dragState.target;
  const pitchElement = target.closest('.pitch') as HTMLElement;
  
  if (!pitchElement) {
    console.error('Pitch element not found in pointer move');
    return;
  }
  
  const pitchRect = pitchElement.getBoundingClientRect();
  
  // Calculate new position relative to the pitch
  const newLeft = e.clientX - pitchRect.left - dragState.offsetX;
  const newTop = e.clientY - pitchRect.top - dragState.offsetY;
  
  // Calculate position as percentage of pitch dimensions
  const xPercent = (newLeft / pitchRect.width) * 100;
  const yPercent = (newTop / pitchRect.height) * 100;
  
  // Clamp position within pitch boundaries (0-100%)
  const clampedX = Math.max(0, Math.min(100, xPercent));
  const clampedY = Math.max(0, Math.min(100, yPercent));
  
  // Update element position
  target.style.left = `${clampedX}%`;
  target.style.top = `${clampedY}%`;
  
  // Dispatch an update event for real-time position updates
  const updateEvent = new CustomEvent('playerPositionUpdate', {
    detail: {
      playerId: dragState.playerId,
      x: clampedX,
      y: clampedY
    }
  });
  
  pitchElement.dispatchEvent(updateEvent);
}

export function pointerUp(e: PointerEvent, dragState: DragState): void {
  if (!dragState.dragging || !dragState.target) return;
  
  const target = dragState.target;
  const pitchElement = target.closest('.pitch') as HTMLElement;
  
  if (!pitchElement) {
    console.error('Pitch element not found in pointer up');
    return;
  }
  
  // Get the final position as percentages
  const style = getComputedStyle(target);
  const leftStr = style.getPropertyValue('left');
  const topStr = style.getPropertyValue('top');
  
  // Parse the position values (strip off the % if present)
  const xPercent = parseFloat(leftStr);
  const yPercent = parseFloat(topStr);
  
  console.log('Final position:', xPercent, yPercent);
  
  // Dispatch a final position event
  const finalEvent = new CustomEvent('playerPositionFinal', {
    detail: {
      playerId: dragState.playerId,
      x: xPercent,
      y: yPercent
    }
  });
  
  pitchElement.dispatchEvent(finalEvent);
  
  // Reset the drag state
  dragState.dragging = false;
  dragState.target = null;
  dragState.playerId = undefined;
  
  console.log('Finished dragging player');
}