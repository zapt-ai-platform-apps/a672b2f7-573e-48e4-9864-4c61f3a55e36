const createShapes = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 8 + 3}rem`,
    opacity: Math.random() * 0.15 + 0.05,
    animation: `float ${Math.random() * 20 + 15}s linear infinite`,
    animationDelay: `${Math.random() * 10}s`,
    blur: `${Math.random() * 60 + 40}px`,
    type: Math.random() > 0.5 ? 'circle' : 'square',
    color: i % 3 === 0 
      ? 'from-blue-400 to-blue-600' 
      : i % 3 === 1 
        ? 'from-indigo-400 to-indigo-600' 
        : 'from-purple-400 to-purple-600'
  }));
};

export default createShapes;