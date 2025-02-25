export interface DragState {
  dragging: boolean;
  target: HTMLElement | null;
  offsetX: number;
  offsetY: number;
}

export function pointerDown(e: PointerEvent, dragState: DragState): void {
  const targetElement = e.target as HTMLElement;
  const playerElement = targetElement.closest('.player-marker') as HTMLElement;
  if (!playerElement) return;
  dragState.dragging = true;
  dragState.target = playerElement;
  const rect = playerElement.getBoundingClientRect();
  dragState.offsetX = e.clientX - rect.left;
  dragState.offsetY = e.clientY - rect.top;
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
}

export function pointerMove(e: PointerEvent, dragState: DragState): void {
  if (!dragState.dragging || !dragState.target) return;
  const pitch = dragState.target.closest('.football-pitch') as HTMLElement;
  if (!pitch) return;
  const pitchRect = pitch.getBoundingClientRect();
  const playerWidth = dragState.target.offsetWidth;
  const playerHeight = dragState.target.offsetHeight;
  let newX = e.clientX - pitchRect.left - dragState.offsetX;
  let newY = e.clientY - pitchRect.top - dragState.offsetY;
  newX = Math.max(0, Math.min(pitchRect.width - playerWidth, newX));
  newY = Math.max(0, Math.min(pitchRect.height - playerHeight, newY));
  dragState.target.style.left = `${newX}px`;
  dragState.target.style.top = `${newY}px`;
  const playerId = dragState.target.getAttribute('data-player-id');
  if (playerId) {
    const posX = (newX / (pitchRect.width - playerWidth)) * 100;
    const posY = (newY / (pitchRect.height - playerHeight)) * 100;
    dragState.target.setAttribute('data-position-x', posX.toString());
    dragState.target.setAttribute('data-position-y', posY.toString());
  }
}

export function pointerUp(e: PointerEvent, dragState: DragState): void {
  if (dragState.dragging && dragState.target) {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    dragState.dragging = false;
    dragState.target = null;
  }
}