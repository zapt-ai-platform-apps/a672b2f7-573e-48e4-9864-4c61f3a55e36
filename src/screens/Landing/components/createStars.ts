const createStars = () => {
  return Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    opacity: Math.random() * 0.7 + 0.3,
    animation: `pulse ${Math.random() * 5 + 3}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 5}s`,
  }));
};

export default createStars;