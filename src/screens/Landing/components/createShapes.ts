export default function createShapes() {
  const shapesCount = Math.floor(Math.random() * 5) + 8; // 8-12 shapes
  const shapes = [];

  // Enhanced color palette for a more vibrant look
  const colors = [
    'from-blue-400 to-blue-700',
    'from-indigo-400 to-indigo-700',
    'from-purple-400 to-purple-700',
    'from-blue-300 to-indigo-600',
    'from-indigo-300 to-purple-600',
    'from-purple-300 to-pink-600',
    'from-pink-400 to-purple-700',
    'from-sky-400 to-blue-700',
    'from-violet-400 to-purple-700'
  ];

  for (let i = 0; i < shapesCount; i++) {
    const type = Math.random() > 0.5 ? 'circle' : 'square';
    const size = Math.random() * 20 + 5; // 5-25rem
    const top = `${Math.random() * 100}%`;
    const left = `${Math.random() * 100}%`;
    const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
    const blur = `${Math.random() * 50 + 20}px`; // 20-70px
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // More dynamic movement
    const moveX = (Math.random() - 0.5) * 100; // -50 to 50
    const moveY = (Math.random() - 0.5) * 100; // -50 to 50
    const duration = Math.random() * 20 + 15; // 15-35s
    
    shapes.push({
      id: i,
      top,
      left,
      size,
      opacity,
      blur,
      type,
      color,
      move: {
        x: moveX,
        y: moveY,
        duration
      }
    });
  }

  return shapes;
}