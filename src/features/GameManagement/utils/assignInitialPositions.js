export default function assignInitialPositions(pitchRef) {
  const playerElements = pitchRef.querySelectorAll('.player');
  const totalPlayers = playerElements.length;
  if (totalPlayers === 0) return;
  const pitchRect = pitchRef.getBoundingClientRect();
  const spacing = pitchRect.width / (totalPlayers + 1);
  const centerY = pitchRect.height / 2;
  playerElements.forEach((el, index) => {
    const x = spacing * (index + 1);
    const y = centerY;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
}