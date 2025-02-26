type ShapeType = 'circle' | 'square';

const createShapes = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 8 + 3, // Changed to number (without 'rem')
    opacity: Math.random() * 0.15 + 0.05,
    blur: `${Math.random() * 60 + 40}px`,
    type: (Math.random() > 0.5 ? 'circle' : 'square') as ShapeType,
    color: i % 3 === 0 
      ? 'from-blue-400 to-blue-600' 
      : i % 3 === 1 
        ? 'from-indigo-400 to-indigo-600' 
        : 'from-purple-400 to-purple-600',
    move: {
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      duration: Math.random() * 20 + 15,
    }
  }));
};

export default createShapes;